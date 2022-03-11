import { configureStore } from '@reduxjs/toolkit';
import userReducer from './users';

const store = configureStore({
  reducer: {
<<<<<<< HEAD
<<<<<<< HEAD
    users: userReducer,
=======
    // boardReducer: boardListSlice.reducer,
    // detailReducer: detailSlice.reducer,
    // userReducer: userSlice.reducer,
>>>>>>> main
=======
    users: userReducer,
>>>>>>> f447579d82aef4f7284c45ca951190a1bf95435e
  },
});

export default store;
