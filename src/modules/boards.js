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
    console.log(response);
    return response.data;
  },
);

export const createBoardAsync = createAsyncThunk(
  'boards/createBoard',
  async (boardInfo, thunkAPI) => {
    const { title, content, imageUrl, category } = boardInfo;
    await apis
      .createBoard(title, content, imageUrl, category)
      .then((response) => {
        console.log(response);
      })
      .catch((e) => console.log(e));
    return;
  },
);

export const searchBoardAsync = createAsyncThunk(
  'boards/searchBoard',
  async ({ search }, thunkAPI) => {
    const response = await apis
      .searchBoard(search)
      .then((response) => {
        console.log(response);
      })
      .catch((e) => {
        return null;
      });
    return response.data;
  },
);

export const agreeBoardAsync = createAsyncThunk(
  'detail/agreeBoard',
  async (voteInfo, thunkAPI) => {
    const { userVoteStatus, boardId } = voteInfo;
    if (boardId) {
      await apis
        .agreeBoard(boardId)
        .then((response) => {
          console.log(response);
          if (userVoteStatus === '없다' || userVoteStatus === '찬성') {
            if (response.data.clicked) {
              thunkAPI.dispatch(increaseAgreeCount());
              thunkAPI.dispatch(setUserVoteStatus('찬성'));
            } else {
              thunkAPI.dispatch(decreaseAgreeCount());
              thunkAPI.dispatch(setUserVoteStatus('없다'));
            }
          } else if (userVoteStatus === '반대') {
            if (!response.data.clicked) {
              thunkAPI.dispatch(increaseAgreeCount());
              thunkAPI.dispatch(decreaseDisagreeCount());
              thunkAPI.dispatch(setUserVoteStatus('찬성'));
            } else {
            }
          }
        })
        .catch((error) => {
          if (error) {
            console.log(error.response.message); // 어떻게 서버에서 에러 메시지 오는지 확인
          }
          return thunkAPI.rejectWithValue();
        });
    }
  },
);

export const disagreeBoardAsync = createAsyncThunk(
  'detail/increaseDisagreeCount',
  async (voteInfo, thunkAPI) => {
    const { userVoteStatus, boardId } = voteInfo;
    if (boardId) {
      await apis
        .disagreeBoard(boardId)
        .then((response) => {
          console.log(response);
          if (userVoteStatus === '없다' || userVoteStatus === '반대') {
            if (response.data.clicked) {
              thunkAPI.dispatch(increaseDisagreeCount());
              thunkAPI.dispatch(setUserVoteStatus('반대'));
            } else {
              thunkAPI.dispatch(decreaseDisagreeCount());
              thunkAPI.dispatch(setUserVoteStatus('없다'));
            }
          } else if (userVoteStatus === '찬성') {
            if (!response.data.clicked) {
              thunkAPI.dispatch(increaseDisagreeCount());
              thunkAPI.dispatch(decreaseAgreeCount());
              thunkAPI.dispatch(setUserVoteStatus('반대'));
            }
          }
        })
        .catch((error) => {
          if (error) {
            window.alert('잘못된 투표 요청입니다.');
          }
          return thunkAPI.rejectWithValue();
        });
    } else {
      window.alert('잘못된 투표 요청입니다.');
    }
  },
);

export const increaseRecommendCountAsync = createAsyncThunk(
  'detail/increaseBoardDisagreeCount',
  async (boardId, thunkAPI) => {
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
  reducers: {
    clearBoardList: (state) => {
      state.status = 'idle';
      state.data = [];
    },
  },
  extraReducers: {
    [getBoardListAsync.fulfilled]: (state, action) => {
      state.status = 'success';
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
    [createBoardAsync.fulfilled]: (state, action) => {
      state.data.push(action.payload);
    },
  },
});

export const liveBoardListSlice = createSlice({
  name: 'liveBoardList',
  initialState: liveBoardListInitialState,
  reducers: {
    clearLiveBoardList: (state) => {
      state.status = 'idle';
      state.data = [];
    },
  },
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
    clearDetail: (state) => {
      state.status = 'idle';
      state.data = {};
    },
    setUserVoteStatus: (state, action) => {
      console.log(action.payload);
      state.data.userStatus = action.payload;
    },
    increaseAgreeCount: (state) => {
      state.data.agreeCount += 1;
    },
    increaseDisagreeCount: (state) => {
      state.data.disagreeCount += 1;
    },
    increaseRecommendCount: (state) => {
      state.data.recommendCount += 1;
    },
    decreaseAgreeCount: (state) => {
      state.data.agreeCount -= 1;
    },
    decreaseDisagreeCount: (state) => {
      state.data.disagreeCount -= 1;
    },
    decreaseRecommendCount: (state) => {
      state.data.recommendCount -= 1;
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
export const { clearBoardList } = boardListSlice.actions;
export const { clearLiveBoardList } = liveBoardListSlice.actions;
export const {
  clearDetail,
  setUserVoteStatus,
  increaseAgreeCount,
  increaseDisagreeCount,
  increaseRecommendCount,
  decreaseAgreeCount,
  decreaseDisagreeCount,
  decreaseRecommendCount,
} = detailSlice.actions;
export const selectedBoardList = (state) => state.boards;
export const selectedLiveBoardList = (state) => state.liveBoards;
export const selectedDetail = (state) => state.detail.data;

export const selectedUserVoteStatus = (state) => state.detail.data.userStatus;
export const selectedAgreeCount = (state) => state.detail.data.agreeCount;
export const selectedDisagreeCount = (state) => state.detail.data.disagreeCount;
