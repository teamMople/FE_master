import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import apis from '../apis/apis';

const commentListInitialState = {
  data: [],
  status: 'idle',
};

export const getCommentListAsync = createAsyncThunk(
  'comments/getCommentList',
  async ({ boardId }, thunkAPI) => {
    const response = await apis.getCommentsByBoard(boardId);
    return response.data;
  },
);

// 생성자 정보 안 보내도 되는지 확인
export const createCommentAsync = createAsyncThunk(
  'comments/createComment',
  async ({ boardId, content }, thunkAPI) => {
    await apis
      .createComment(boardId, content)
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

// 생성자 정보 안 보내도 되는지 확인
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

export const increaseRecommendCountAsync = createAsyncThunk(
  'comments/increaseRecommendCount',
  async ({ commentId }, thunkAPI) => {
    if (commentId) {
      await apis
        .recommendComment(commentId)
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
  commentListInitialState,
  reducers: {},
  extraReducers: () => {},
});

export const {} = commentListSlice.actions;
export const selectCommentListState = (state) => state.commentList;
