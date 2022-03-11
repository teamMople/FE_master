import { configureStore } from '@reduxjs/toolkit';
import userReducer from './users';

const store = configureStore({
  reducer: {
    users: userReducer,
  },
});

export const useAppDispatch = () => store.dispatch;
export default store;
