import { configureStore } from '@reduxjs/toolkit';
import userReducer from './users';
import { alarmSlice } from './alarms';
import {
  boardListSlice,
  liveBoardListSlice,
  combinedBoardListSlice,
  detailSlice,
} from './boards';
import { commentListSlice, replyCommentListSlice } from './comments';
import chatReducer from './chat';
import modalReducer from './modal';
import themeReducer from './serviceTheme';

const store = configureStore({
  reducer: {
    alarms: alarmSlice.reducer,
    users: userReducer,
    boards: boardListSlice.reducer,
    liveBoards: liveBoardListSlice.reducer,
    combinedBoards: combinedBoardListSlice.reducer,
    detail: detailSlice.reducer,
    comments: commentListSlice.reducer,
    replyComments: replyCommentListSlice.reducer,
    chats: chatReducer,
    modals: modalReducer,
    theme: themeReducer,
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
