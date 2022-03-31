import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import apis from '../apis/apis';

const commentListInitialState = {
  data: [],
  status: 'idle',
};

const replyCommentListInitialState = {
  data: [],
  status: 'idle',
};

const commentInitialState = {
  data: {},
  status: 'idle',
};

const replyCommentInitialState = {
  data: {},
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

export const getReplyCommentListAsync = createAsyncThunk(
  'comments/getReplyCommentList',
  async (commentId, thunkAPI) => {
    try {
      const response = await apis.getReplyCommentListByComment(commentId);
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

export const createReplyCommentAsync = createAsyncThunk(
  'comments/createComment',
  async (replyCommentInfo, thunkAPI) => {
    console.log(replyCommentInfo);
    const { commentId, replyContent } = replyCommentInfo;
    console.log(commentId);
    await apis.createReplyComment(commentId, replyContent).then((response) => {
      console.log(response);
      thunkAPI.addReplyComment(response.data);
    });
  },
);

export const deleteCommentAsync = createAsyncThunk(
  'comments/deleteComment',
  async ({ commentId }, thunkAPI) => {
    await apis
      .deleteComment(commentId)
      .then((response) => {
        if (response.data.status === 'ok') {
          thunkAPI.dispatch();
        }
      })
      .catch((error) => {
        if (error) {
          window.alert('잘못된 생성 요청입니다.');
        }
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

export const recommendReplyCommentAsync = createAsyncThunk(
  'comments/increaseRecommendCount',
  async (replyId, thunkAPI) => {
    if (replyId) {
      await apis
        .recommendReplyComment(replyId)
        .then((response) => {
          if (response.data.clicked) {
            thunkAPI.dispatch();
          } else {
            thunkAPI.dispatch();
          }
        })
        .catch((error) => {
          if (error) {
            window.alert('잘못된 추천 요청입니다.');
          }
          return thunkAPI.rejectWithValue();
        });
    } else {
      window.alert('잘못된 추천 요청입니다.');
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

export const replyCommentListSlice = createSlice({
  name: 'replyCommentList',
  initialState: replyCommentListInitialState,
  reducers: {
    clearReplyCommentList: (state) => {
      state.status = 'idle';
      state.data = [];
    },
    addReplyComment: (state, action) => {
      state.data.push(action.payload);
    },
    increaseReplyRecommendCount: (state, action) => {
      const replyIndex = state.data.findIndex((d) => {
        return d.replyId === action.payload;
      });
      state.data[replyIndex].recommendCount += 1;
    },
    decreaseReplyRecommendCount: (state, action) => {
      const commentIndex = state.data.findIndex((d) => {
        return d.commentId === action.payload;
      });
      state.data[commentIndex].recommendCount -= 1;
    },
  },
  extraReducers: {
    [getReplyCommentListAsync.fulfilled]: (state, action) => {
      state.status = 'success';
      state.data = action.payload;
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
  clearCommentList,
  addComment,
  increaseRecommendCount,
  decreaseRecommendCount,
} = commentListSlice.actions;

export const {
  clearReplyCommentList,
  addReplyComment,
  increaseReplyRecommendCount,
  decreaseReplyRecommendCount,
} = replyCommentListSlice.actions;
export const selectedCommentList = (state) => state.comments.data;
export const selectedReplyCommentList = (state) => state.replyComments.data;
