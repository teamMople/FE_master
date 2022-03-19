import {
  combineReducers,
  createAsyncThunk,
  createSlice,
} from '@reduxjs/toolkit';
import axios from 'axios';

const roomInitialState = {
  data: {
    roomName: undefined,
    moderator: undefined,
    publisher: undefined,
  },
  subscribers: [],
  remoteHandsUpStatus: [{ remoteTarget: undefined, isHandsUp: undefined }],
  remotePermissionStatus: [{ remoteTarget: undefined, permitSpeaking: false }],
};

const sessionInit = {
  mySession: undefined,
};

export const getToken = createAsyncThunk('get/token', async (data) => {
  return await axios
    .post(`http://localhost:8080/api/audio/join`, data)
    .then((res) => {
      return res.data.token;
    })
    .catch((err) => console.log(err));
});

export const sessionSlice = createSlice({
  name: 'session',
  initialState: sessionInit,
  reducers: {
    setSession: (state, action) => {
      state.mySession = action.payload;
    },
  },
});
export const roomSlice = createSlice({
  name: 'room',
  initialState: roomInitialState,
  reducers: {
    setRoomInfo: (state, action) => {
      state.data = action.payload;
    },
    setRoomSubscribers: (state, action) => {
      // console.log('🐥 redux 구독자 상태값: ', state.subscribers);

      // state.subscribers = [...state.subscribers, action.payload];
      state.subscribers.push(action.payload);
    },
    setRemoteHandsUpStatus: (state, action) => {
      state.remoteHandsUpStatus.push(action.payload);
    },
    setRemotePermissionStatus: (state, action) => {
      state.remotePermissionStatus.push(action.payload);
    },
  },
});

export const {
  setRoomInfo,
  setRoomSubscribers,
  setRemoteHandsUpStatus,
  setRemotePermissionStatus,
} = roomSlice.actions;
export const { setSession } = sessionSlice.actions;
const reducer = combineReducers({
  room: roomSlice.reducer,
  session: sessionSlice.reducer,
});

export default reducer;
