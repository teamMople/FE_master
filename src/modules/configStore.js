import { configureStore } from '@reduxjs/toolkit';
import userReducer from './users';

const store = configureStore({
  reducer: {
    users: userReducer,
    // boardReducer: boardListSlice.reducer,
    // detailReducer: detailSlice.reducer,
  },
});

export default store;
