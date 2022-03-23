import { configureStore } from '@reduxjs/toolkit';
import userReducer from './users';
import { boardListSlice, liveBoardListSlice, detailSlice } from './boards';
import { commentListSlice, replyCommentListSlice } from './comments';
import roomReducer from './voiceChat';
import chatReducer from './chat';

const store = configureStore({
  reducer: {
    users: userReducer,
    boards: boardListSlice.reducer,
    liveBoards: liveBoardListSlice.reducer,
    detail: detailSlice.reducer,
    comments: commentListSlice.reducer,
    replyComments: replyCommentListSlice.reducer,
    rooms: roomReducer,
    chats: chatReducer,
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
