import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import apis from '../apis/apis';

const commentListInitialState = {
  data: [],
  status: 'idle',
};

export const getCommentListAsync = createAsyncThunk(
  'comments/getCommentList',
  async (boardId, thunkAPI) => {
    try {
      const response = await apis.getCommentsByBoard(boardId);
      return response.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(await e.response.data);
    }
  },
);

export const createCommentAsync = createAsyncThunk(
  'comments/createComment',
  async (commentInfo, thunkAPI) => {
    const { boardId, content } = commentInfo;
    await apis
      .createComment(boardId, content)
      .then((response) => thunkAPI.dispatch(addComment(response.data)))
      .catch((error) => {
        return thunkAPI.rejectWithValue();
      });
  },
);

export const deleteCommentAsync = createAsyncThunk(
  'comments/deleteComment',
  async (commentId, thunkAPI) => {
    await apis
      .deleteComment(commentId)
      .then((response) => {
        console.log(response);
        thunkAPI.dispatch(deleteComment(commentId));
      })
      .catch((error) => {
        return thunkAPI.rejectWithValue();
      });
  },
);

export const recommendCommentAsync = createAsyncThunk(
  'comments/increaseRecommendCount',
  async (commentId, thunkAPI) => {
    if (commentId) {
      await apis
        .recommendComment(commentId)
        .then((response) => {
          if (response.data.clicked) {
            thunkAPI.dispatch(increaseRecommendCount(commentId));
          } else {
            thunkAPI.dispatch(decreaseRecommendCount(commentId));
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

export const commentListSlice = createSlice({
  name: 'commentList',
  initialState: commentListInitialState,
  reducers: {
    clearCommentList: (state) => {
      state.status = 'idle';
      state.data = [];
    },
    addComment: (state, action) => {
      state.data.push(action.payload);
    },
    deleteComment: (state, action) => {
      const commentId = state.data.findIndex((d) => {
        return d.commentId === action.payload;
      });
      const deletedComments = state.data.filter((d, index) => {
        return index !== commentId;
      });
      state.data = deletedComments;
    },
    increaseRecommendCount: (state, action) => {
      const commentIndex = state.data.findIndex((d) => {
        return d.commentId === action.payload;
      });
      state.data[commentIndex].recommendCount += 1;
    },
    decreaseRecommendCount: (state, action) => {
      const commentIndex = state.data.findIndex((d) => {
        return d.commentId === action.payload;
      });
      state.data[commentIndex].recommendCount -= 1;
    },
  },
  extraReducers: {
    [getCommentListAsync.fulfilled]: (state, action) => {
      state.status = 'success';
      state.data = action.payload;
    },
    [getCommentListAsync.pending]: (state) => {
      state.status = 'loading';
    },
    [getCommentListAsync.rejected]: (state) => {
      state.status = 'failed';
    },
  },
});

export const {
  clearCommentList,
  addComment,
  deleteComment,
  increaseRecommendCount,
  decreaseRecommendCount,
} = commentListSlice.actions;
export const selectedCommentList = (state) => state.comments.data;
export const selectedCommentCount = (state) =>
  state.comments.data ? state.comments.data.length : 0;
export default commentListSlice.reducer;
