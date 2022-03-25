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
      .then((response) => {
        console.log(response);
        if (response.status === 200) {
          return content;
        }
      })
      .catch((error) => {
        if (error) {
          window.alert('잘못된 생성 요청입니다.');
          console.log(error.response.message);
        }
        return thunkAPI.rejectWithValue();
      });
  },
);

export const createReplyCommentAsync = createAsyncThunk(
  'comments/createComment',
  async (replyCommentInfo, thunkAPI) => {
    const { id, replyContent } = replyCommentInfo;
    console.log(replyCommentInfo);
    console.log(id);
    await apis
      .createReplyComment(id, replyContent)
      .then((response) => {
        console.log(response);
        return response.data;
      })
      .catch((error) => {
        if (error) {
          window.alert('잘못된 생성 요청입니다.');
          console.log(error.response.message);
        }
        return thunkAPI.rejectWithValue();
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
          console.log(error.response.message); // 어떻게 서버에서 에러 메시지 오는지 확인
        }
        return thunkAPI.rejectWithValue();
      });
  },
);

export const increaseCommentRecommendCountAsync = createAsyncThunk(
  'comments/increaseRecommendCount',
  async (commentId, thunkAPI) => {
    if (commentId) {
      console.log(commentId);
      await apis
        .recommendComment(commentId)
        .then(thunkAPI.dispatch(increaseRecommendCount(commentId)))
        .catch((error) => {
          if (error) {
            console.log(error.response.message); // 어떻게 서버에서 에러 메시지 오는지 확인
          }
          return thunkAPI.rejectWithValue();
        });
    }
  },
);

export const increaseReplyCommentRecommendCountAsync = createAsyncThunk(
  'comments/increaseRecommendCount',
  async ({ replyId }, thunkAPI) => {
    if (replyId) {
      await apis
        .recommendReplyComment(replyId)
        .then((response) => {
          if (response.data.status === 'ok') {
            thunkAPI.dispatch();
          }
        })
        .catch((error) => {
          if (error) {
            window.alert('잘못된 추천 요청입니다.');
            console.log(error.response.message); // 어떻게 서버에서 에러 메시지 오는지 확인
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
    increaseRecommendCount: (state, commentId) => {
      console.log('increase');
      state.data.filter((d) => {
        return d.commentId === commentId;
      }).recommendcount += 1;
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
    addReplyComment: (state, action) => {
      state.data.push(action.payload);
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

export const { clearCommentList, increaseRecommendCount } =
  commentListSlice.actions;
export const selectedCommentList = (state) => state.comments.data;
export const selectedReplyCommentList = (state) => state.replyComments.data;
