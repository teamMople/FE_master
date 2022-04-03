import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import apis from '../apis/apis';

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

export const getDetailAsync = createAsyncThunk(
  'boards/getDetail',
  async (boardId) => {
    const response = await apis.getDetail(boardId);
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

const detailSlice = createSlice({
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
export const selectedDetail = (state) => state.detail.data;
export const selectedUserVoteStatus = (state) => state.detail.data.userStatus;
export const selectedAgreeCount = (state) => state.detail.data.agreeCount;
export const selectedDisagreeCount = (state) => state.detail.data.disagreeCount;

export default detailSlice.reducer;
