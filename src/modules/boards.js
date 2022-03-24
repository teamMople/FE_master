import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { useNavigate } from 'react-router-dom';
import apis from '../apis/apis';

const boardListInitialState = {
  data: [],
  status: 'idle',
};

const liveBoardListInitialState = {
  data: [],
  status: 'idle',
};

const detailInitialState = {
  data: {
    id: '',
    title: '',
    nickname: '',
    profileImageUrl: '',
    content: '',
    imageUrl: '',
    agreeCount: 0,
    disagreeCount: 0,
    recommendCount: 0,
    createdAt: [],
    category: '',
  },
  status: 'idle',
};

export const getBoardListAsync = createAsyncThunk(
  'boards/getBoardList',
  async (thunkAPI) => {
    try {
      const response = await apis.getBoardList();
      console.log(response.data);
      return response.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(await e.response.data);
    }
  },
);

export const getBoardListByCategoryAsync = createAsyncThunk(
  'boards/getBoardListByCategory',
  async (categoryName) => {
    const response = await apis.getBoardListByCategory(categoryName);
    return response.data;
  },
);

export const getLiveBoardListAsync = createAsyncThunk(
  'boards/getLiveBoardList',
  async (thunkAPI) => {
    try {
      const response = await apis.getLiveRoomList();
      console.log(response.data);
      return response.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(await e.response.data);
    }
  },
);

export const getLiveBoardListByCategoryAsync = createAsyncThunk(
  'boards/getLiveBoardListByCategory',
  async (categoryName) => {
    const response = await apis.getLiveRoomListByCategory(categoryName);
    return response.data;
  },
);

export const getDetailAsync = createAsyncThunk(
  'boards/getDetail',
  async (boardId) => {
    const response = await apis.getDetail(boardId);
    console.log(response.data);
    return response.data;
  },
);

export const createBoardAsync = createAsyncThunk(
  'boards/createBoard',
  async (boardInfo) => {
    const { title, content, imageUrl, category } = boardInfo;

    const response = await apis
      .createBoard(title, content, imageUrl, category)
      .then((response) => {
        console.log(response);
      });
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
  initialState: boardListInitialState,
  reducers: {},
  extraReducers: {
    [getBoardListAsync.fulfilled]: (state, action) => {
      state.status = 'success';
      console.log(action.payload);
      state.data = action.payload;
    },
    [getBoardListAsync.pending]: (state) => {
      state.status = 'loading';
    },
    [getBoardListAsync.rejected]: (state) => {
      state.status = 'failed';
    },
    [getBoardListByCategoryAsync.fulfilled]: (state, action) => {
      state.status = 'success';
      state.data = action.payload;
    },
    [getBoardListByCategoryAsync.pending]: (state) => {
      state.status = 'loading';
    },
    [getBoardListByCategoryAsync.rejected]: (state) => {
      state.status = 'failed';
    },
  },
});

export const liveBoardListSlice = createSlice({
  name: 'liveBoardList',
  initialState: liveBoardListInitialState,
  reducers: {},
  extraReducers: {
    [getLiveBoardListAsync.fulfilled]: (state, action) => {
      state.status = 'success';
      state.data = action.payload;
    },
    [getLiveBoardListAsync.pending]: (state) => {
      state.status = 'loading';
    },
    [getLiveBoardListAsync.rejected]: (state) => {
      state.status = 'failed';
    },
    [getLiveBoardListByCategoryAsync.fulfilled]: (state, action) => {
      state.status = 'success';
      state.data = action.payload;
    },
    [getLiveBoardListByCategoryAsync.pending]: (state) => {
      state.status = 'loading';
    },
    [getLiveBoardListByCategoryAsync.rejected]: (state) => {
      state.status = 'failed';
    },
  },
});

export const detailSlice = createSlice({
  name: 'detail',
  initialState: detailInitialState,
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
        state.data = action.payload;
      })
      .addCase(getDetailAsync.rejected, (state) => {
        state.status = 'failed';
      });
  },
});

export const { loadBoardList } = boardListSlice.actions;
export const {
  increaseAgreeCount,
  increaseDisagreeCount,
  increaseRecommendCount,
} = detailSlice.actions;
export const selectedBoardList = (state) => state.boards.data;
export const selectedLiveBoardList = (state) => state.liveBoards.data;
export const selectedDetail = (state) => state.detail.data;
