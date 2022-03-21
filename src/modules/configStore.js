import { configureStore } from '@reduxjs/toolkit';
import userReducer from './users';

const store = configureStore({
  reducer: {
    users: userReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      // serializableCheck: {
      //   // Ignore these action types
      //   ignoreActions: ['room.setRoomInfo'],
      //   // Ignore these field paths in all actions
      //   ignoredActionPaths: ['payload'],
      //   // Ignore these paths in the state
      //   // ignoredPaths: ['items.dates'],
      // },
      serializableCheck: false,
    }),
});

export default store;
