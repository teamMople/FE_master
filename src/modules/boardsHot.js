import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import apis from '../apis/apis';

const boardHotListInitialState = {
  data: [],
  status: 'idle',
};
export const getBoardHotListAsync = createAsyncThunk(
  'boards/getTopBoardList',
  async ({ size, page }, thunkAPI) => {
    try {
      const response = await apis.getBoardTopList(size, page);
      return response.data;
    } catch (e) {
      return thunkAPI.rejectWithValue(await e.response.data);
    }
  },
);
export const boardHotListSlice = createSlice({
  name: 'boardTopList',
  initialState: boardHotListInitialState,
  reducers: {
    clearBoardHotList: (state) => {
      state.status = 'idle';
      state.data = [];
    },
  },
  extraReducers: {
    [getBoardHotListAsync.fulfilled]: (state, action) => {
      state.status = 'success';
      state.data = action.payload;
    },
    [getBoardHotListAsync.pending]: (state) => {
      state.status = 'loading';
    },
    [getBoardHotListAsync.rejected]: (state) => {
      state.status = 'rejected';
    },
  },
});

export const { clearBoardHotList } = boardHotListSlice.actions;
export const selectedBoardHotList = (state) => state.boardsHot;
export default boardHotListSlice.reducer;
