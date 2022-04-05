import { combineReducers, configureStore } from '@reduxjs/toolkit';
import { persistReducer } from 'redux-persist';
import storage from 'redux-persist/lib/storage';

import boardReducer from './boards';
import boardHotReducer from './boardsHot';
import chatReducer from './chat';
import combinedBoardReducer from './combinedBoards';
import commentReducer from './comments';
import detailReducer from './detail';
import liveBoardReducer from './liveBoards';
import modalReducer from './modal';
import notificationReducer from './notifications';
import replyCommentReducer from './replyComments';
import userReducer from './users';
import themeReducer from './serviceTheme';

// Root Reducer
export const rootReducer = combineReducers({
  boards: boardReducer,
  boardsHot: boardHotReducer,
  chats: chatReducer,
  combinedBoards: combinedBoardReducer,
  comments: commentReducer,
  detail: detailReducer,
  liveBoards: liveBoardReducer,
  modals: modalReducer,
  notifications: notificationReducer,
  replyComments: replyCommentReducer,
  users: userReducer,
  theme: themeReducer,
});

// Redux-persist
const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['notificationReducer'],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

// store
export const store = configureStore({
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

export default persistReducer(persistConfig, rootReducer);
