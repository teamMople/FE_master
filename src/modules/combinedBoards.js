import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import apis from '../apis/apis';

const combinedBoardListInitialState = {
  data: [],
  status: 'idle',
};

export const searchBoardAsync = createAsyncThunk(
  'boards/searchBoard',
  async (search, thunkAPI) => {
    const response = await apis.searchBoard(search);
    return response.data;
  },
);

export const searchLiveBoardAsync = createAsyncThunk(
  'boards/searchLiveBoard',
  async (search, thunkAPI) => {
    const response = await apis.searchLiveRoom(search);
    return response.data;
  },
);

const combinedBoardListSlice = createSlice({
  name: 'combinedBoardList',
  initialState: combinedBoardListInitialState,
  reducers: {
    clearCombinedBoardList: (state) => {
      state.status = 'idle';
      state.data = [];
    },
  },
  extraReducers: {
    [searchBoardAsync.fulfilled]: (state, action) => {
      state.status = 'success';
      action.payload.forEach((p) => {
        state.data.push({ type: 'basic', ...p });
      });
    },
    [searchBoardAsync.pending]: (state) => {
      state.status = 'loading';
    },
    [searchBoardAsync.rejected]: (state) => {
      state.status = 'failed';
    },
    [searchLiveBoardAsync.fulfilled]: (state, action) => {
      state.status = 'success';
      action.payload.forEach((p) => {
        state.data.push({ type: 'live', ...p });
      });
    },
    [searchLiveBoardAsync.pending]: (state) => {
      state.status = 'loading';
    },
    [searchLiveBoardAsync.rejected]: (state) => {
      state.status = 'failed';
    },
  },
});

export const { clearCombinedBoardList } = combinedBoardListSlice.actions;
export const selectedCombinedBoardList = (state) => state.combinedBoards;
export default combinedBoardListSlice.reducer;
