import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { apis } from '../apis/apis';

const initialState = {
  data,
  status
}

export const getBoardListAsync = createAsyncThunk(
    "boards/getBoardList",
    async () => {
        const response = await apis.getBoardList();
        return response.data; 
    }
);

export const getBoardListByCategoryAsync = createAsyncThunk(
    "boards/getBoardListByCategory",
    async (categoryName) => {
        const response = await apis.getBoardListByCategory();
        return response.data;
    }
);

export const getDetailAsync = createAsyncThunk(
    "boards/getDetail",
    async (boardId) => {
        const response = await apis.getDetail();
        return response.data;
    }
);

export const boardSlice = createSlice({
  name: 'board',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
        .addCase(getBoardListAsync.pending, (state) => {
            state.status = "loading";
        })
        .addCase(getBoardListAsync.fulfilled, (state, action) => {
            state.status = "success";
            return {...status, action.payload};
        })
        .addCase(getBoardListAsync.rejected, (state) => {
            state.status = "failed";
        })
        .addCase(getBoardListByCategoryAsync.pending, (state) => {
            state.staus = "loading";
        })
        .addCase(getBoardListByCategoryAsync.fulfilled, (state, action) => {
            state.status = "success";
            return {...status, action.payload};
        })
        .addCase(getBoardListByCategoryAsync.rejected, (state) => {
            state.status = "failed";
        })
        .addCase(getDetailAsync.pending, (state) => {
            state.staus = "loading";
        })
        .addCase(getDetailAsync.fulfilled, (state, action) => {
            state.status = "success";
            return {...status, action.payload};
        })
        .addCase(getDetailAsync.rejected, (state) => {
            state.status = "failed";
        });
  }
})

export const { increment, decrement, incrementByAmount } = boardSlice.actions
export default boardSlice.reducer