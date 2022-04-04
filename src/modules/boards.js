import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import apis from '../apis/apis';

const boardListInitialState = {
  data: [],
  status: 'idle',
};

export const getBoardListAsync = createAsyncThunk(
  'boards/getBoardList',
  async (listSize = 20, thunkAPI) => {
    try {
      const response = await apis.getBoardList(listSize);
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

export const getMyBoardListAsync = createAsyncThunk(
  'boards/getMyBoardList',
  async () => {
    const response = await apis.getMyBoardList();
    console.log(response.data);
    return response.data;
  },
);

export const getMyCommentListAsync = createAsyncThunk(
  'boards/getMyCommentList',
  async () => {
    const response = await apis.getMyCommentList();
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
        if (response.status === 200) {
          window.location.replace('/home');
        }
      })
      .catch((e) => console.log(e));
  },
);

export const deleteBoardAsync = createAsyncThunk(
  'boards/deleteBoard',
  async (boardId, thunkAPI) => {
    await apis.deleteBoard(boardId).then((response) => {
      console.log(response);
      thunkAPI.dispatch(deleteBoard(boardId));
      window.location.replace('/home');
    });
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
    deleteBoard: (state, action) => {
      const deletedBoardList = state.data.filter(
        (d) => d.boardId !== action.payload,
      );
      state.data = deletedBoardList;
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
    [getMyBoardListAsync.fulfilled]: (state, action) => {
      state.status = 'success';
      state.data = action.payload;
    },
    [getMyBoardListAsync.pending]: (state) => {
      state.status = 'loading';
    },
    [getMyBoardListAsync.rejected]: (state) => {
      state.status = 'failed';
    },
    [getMyCommentListAsync.fulfilled]: (state, action) => {
      state.status = 'success';
      state.data = action.payload;
    },
    [getMyCommentListAsync.pending]: (state) => {
      state.status = 'loading';
    },
    [getMyCommentListAsync.rejected]: (state) => {
      state.status = 'failed';
    },
  },
});

export const { clearBoardList, deleteBoard } = boardListSlice.actions;
export const selectedBoardList = (state) => state.boards;
export default boardListSlice.reducer;
