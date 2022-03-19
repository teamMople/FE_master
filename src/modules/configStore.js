import { configureStore } from '@reduxjs/toolkit';
import userReducer from './users';
import roomReducer from './voiceChat';

const store = configureStore({
  reducer: {
    users: userReducer,
    rooms: roomReducer,
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

export const useAppDispatch = () => store.dispatch;
export default store;
