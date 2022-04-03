import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import apis from '../apis/apis';

const liveBoardListInitialState = {
  data: [],
  status: 'idle',
};

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

const liveBoardListSlice = createSlice({
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

export const { clearLiveBoardList } = liveBoardListSlice.actions;
export const selectedLiveBoardList = (state) => state.liveBoards;
export default liveBoardListSlice.reducer;
