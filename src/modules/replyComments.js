import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import apis from '../apis/apis';

const replyCommentListInitialState = {
  data: [],
  status: 'idle',
};

export const getReplyCommentListAsync = createAsyncThunk(
  'comments/getReplyCommentList',
  async (commentId, thunkAPI) => {
    try {
      const response = await apis.getReplyCommentListByComment(commentId);
      return { commentId: commentId, list: response.data };
    } catch (e) {
      return thunkAPI.rejectWithValue(await e.response.data);
    }
  },
);

export const createReplyCommentAsync = createAsyncThunk(
  'comments/createComment',
  async (replyCommentInfo, thunkAPI) => {
    const { commentId, replyContent } = replyCommentInfo;
    await apis.createReplyComment(commentId, replyContent).then((response) => {
      console.log(response.data);
      thunkAPI.dispatch(addReplyComment(response.data));
    });
  },
);

export const recommendReplyCommentAsync = createAsyncThunk(
  'comments/recommendReplyCommentCount',
  async (ids, thunkAPI) => {
    const { commentId, replyId } = ids;
    if (commentId && replyId) {
      await apis
        .recommendReplyComment(commentId, replyId)
        .then((response) => {
          console.log(response.data);
          if (response.data.clicked) {
            thunkAPI.dispatch(increaseReplyRecommendCount(replyId));
          } else {
            thunkAPI.dispatch(decreaseReplyRecommendCount(replyId));
          }
        })
        .catch((error) => {
          if (error) {
            window.alert('잘못된 추천 요청입니다.');
          }
          return thunkAPI.rejectWithValue();
        });
    }
  },
);

const replyCommentListSlice = createSlice({
  name: 'replyCommentList',
  initialState: replyCommentListInitialState,
  reducers: {
    clearReplyCommentList: (state) => {
      state.status = 'idle';
      state.data = [];
    },
    addReplyCommentList: (state, action) => {
      state.data.push(action.payload);
    },
    addReplyComment: (state, action) => {
      const replyIndex = state.data.findIndex((d) => {
        return d.commentId === action.payload.commentId;
      });
      state.data[replyIndex].list.push(action.payload);
    },
    increaseReplyRecommendCount: (state, action) => {
      const replyIndex = state.data.findIndex((d) => {
        return d.commentId === action.payload.commentId;
      });
      state.data[replyIndex].list.recommendCount += 1;
    },
    decreaseReplyRecommendCount: (state, action) => {
      const replyIndex = state.data.findIndex((d) => {
        return d.commentId === action.payload.commentId;
      });
      state.data[replyIndex].list.recommendCount -= 1;
    },
  },
  extraReducers: {
    [getReplyCommentListAsync.fulfilled]: (state, action) => {
      state.status = 'success';
      state.data.push(action.payload);
    },
    [getReplyCommentListAsync.pending]: (state) => {
      state.status = 'loading';
    },
    [getReplyCommentListAsync.rejected]: (state) => {
      state.status = 'failed';
    },
  },
});

export const {
  clearReplyCommentList,
  addReplyCommentList,
  addReplyComment,
  increaseReplyRecommendCount,
  decreaseReplyRecommendCount,
} = replyCommentListSlice.actions;
export const selectedReplyCommentList = (state) => state.replyComments;
export const selectedReplyCommentCount = (state) =>
  state.replyComments.data.list ? state.replyComments.data.list.length : 0;
export default replyCommentListSlice.reducer;
