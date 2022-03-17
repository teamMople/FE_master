import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import apis from '../apis/apis';
import axios from 'axios';

const boardListInitialState = {
  data: [],
  status: 'idle',
};

const detailInitialState = {
  data: [],
  status: 'idle',
};

export const getBoardListAsync = createAsyncThunk(
  'boards/getBoardList',
  async () => {
    const response = await axios.get('/api/boards');
    return response.data;
  },
);

export const getBoardListByCategoryAsync = createAsyncThunk(
  'boards/getBoardListByCategory',
  async (categoryName) => {
    const response = await apis.getBoardListByCategory();
    return response.data;
  },
);

export const getDetailAsync = createAsyncThunk(
  'boards/getDetail',
  async (boardId) => {
    const response = await apis.getDetail();
    return response.data;
  },
);

export const increaseAgreeCountAsync = createAsyncThunk(
  'boards/increaseAgreeCount',
  async ({ boardId }, thunkAPI) => {
    if (boardId) {
      await apis
        .agreeBoard(boardId)
        .then((response) => {
          if (response.data.status === 'ok') {
            thunkAPI.dispatch(increaseAgreeCount());
          }
        })
        .catch((error) => {
          if (error) {
            window.alert('잘못된 투표 요청입니다.');
            console.log(error.response.message); // 어떻게 서버에서 에러 메시지 오는지 확인
          }
          return thunkAPI.rejectWithValue();
        });
    } else {
      window.alert('잘못된 투표 요청입니다.');
    }
  },
);

export const increaseDisagreeCountAsync = createAsyncThunk(
  'boards/increaseDisagreeCount',
  async ({ boardId }, thunkAPI) => {
    if (boardId) {
      await apis
        .recommendBoard(boardId)
        .then((response) => {
          if (response.data.status === 'ok') {
            thunkAPI.dispatch(increaseDisagreeCountAsync());
          }
        })
        .catch((error) => {
          if (error) {
            window.alert('잘못된 투표 요청입니다.');
            console.log(error.response.message); // 어떻게 서버에서 에러 메시지 오는지 확인
          }
          return thunkAPI.rejectWithValue();
        });
    } else {
      window.alert('잘못된 투표 요청입니다.');
    }
  },
);

export const increaseRecommendCountAsync = createAsyncThunk(
  'boards/increaseBoardDisagreeCount',
  async ({ boardId }, thunkAPI) => {
    if (boardId) {
      await apis
        .disagreeBoard(boardId)
        .then((response) => {
          if (response.data.status === 'ok') {
            thunkAPI.dispatch(increaseRecommendCount());
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

export const boardListSlice = createSlice({
  name: 'boardList',
  boardListInitialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getBoardListAsync.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getBoardListAsync.fulfilled, (state, action) => {
        state.status = 'success';
        state.data.push(action.payload);
      })
      .addCase(getBoardListAsync.rejected, (state) => {
        state.status = 'failed';
      })
      .addCase(getBoardListByCategoryAsync.pending, (state) => {
        state.staus = 'loading';
      })
      .addCase(getBoardListByCategoryAsync.fulfilled, (state, action) => {
        state.status = 'success';
        state.data.push(action.payload);
      })
      .addCase(getBoardListByCategoryAsync.rejected, (state) => {
        state.status = 'failed';
      });
  },
});

export const detailSlice = createSlice({
  name: 'detail',
  detailInitialState,
  reducers: {
    increaseAgreeCount: (state) => {
      state.data.agreeCount += 1;
    },
    increaseDisagreeCount: (state) => {
      state.data.disagreeCount += 1;
    },
    increaseRecommendCount: (state) => {
      state.data.recommendCount += 1;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getDetailAsync.pending, (state) => {
        state.staus = 'loading';
      })
      .addCase(getDetailAsync.fulfilled, (state, action) => {
        state.status = 'success';
        state.data.push(action.payload);
      })
      .addCase(getDetailAsync.rejected, (state) => {
        state.status = 'failed';
      });
  },
});

export const {
  increaseAgreeCount,
  increaseDisagreeCount,
  increaseRecommendCount,
} = detailSlice.actions;
export const selectBoardListState = (state) => state.boardList;
export const selectDetailListState = (state) => state.detail;
