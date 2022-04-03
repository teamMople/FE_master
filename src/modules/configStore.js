import { combineReducers, configureStore } from '@reduxjs/toolkit';
import boardReducer from './boards';
import chatReducer from './chat';
import combinedBoardReducer from './combinedBoards';
import commentReducer from './comments';
import detailReducer from './detail';
import liveBoardReducer from './liveBoards';
import modalReducer from './modal';
import notificationReducer from './notifications';
import replyCommentReducer from './replyComments';
import userReducer from './users';

import persistReducer from 'redux-persist/es/persistReducer';
import storage from 'redux-persist/lib/storage';

// Root Reducer
const rootReducer = combineReducers({
  boards: boardReducer,
  chats: chatReducer,
  combinedBoards: combinedBoardReducer,
  comments: commentReducer,
  detail: detailReducer,
  liveBoards: liveBoardReducer,
  modals: modalReducer,
  notifications: notificationReducer,
  replyComments: replyCommentReducer,
  users: userReducer,
});

// Redux-persist
const persistConfig = {
  key: 'root',
  storage,
  whitelist: [notificationReducer],
  blacklist: [],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

// store
const store = configureStore({
  reducer: persistedReducer,
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
