import { configureStore } from '@reduxjs/toolkit';
import { boardListSlice, detailSlice } from './boards';
import { userSlice } from './users';

const store = configureStore({
  reducer: {
    boardReducer: boardListSlice.reducer,
    detailReducer: detailSlice.reducer,
    userReducer: userSlice.reducer,
  },
});

export default store;
