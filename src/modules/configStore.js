import { configureStore } from '@reduxjs/toolkit';
import userReducer from './users';

const store = configureStore({
  reducer: {
<<<<<<< HEAD
    users: userReducer,
=======
    // boardReducer: boardListSlice.reducer,
    // detailReducer: detailSlice.reducer,
    // userReducer: userSlice.reducer,
>>>>>>> main
  },
});

export default store;
