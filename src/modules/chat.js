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
  remoteForceMuteStatus: [{ remoteTarget: undefined, forceMute: false }],
  joinRoomStatus: {
    role: undefined,
    roomId: undefined,
    roomName: undefined,
    category: undefined,
    moderatorId: undefined,
    moderatorNickname: undefined,
    maxParticipantCount: undefined,
    content: undefined,
    isPrivate: undefined,
    agreeCount: undefined,
    disagreeCount: undefined,
    onAir: undefined,
    createdAt: undefined,
    memberAgreed: undefined,
    memberDisagreed: undefined,
    memberName: undefined,
    accessToken: undefined,
  },
};

const sessionInit = {
  mySession: undefined,
};

const voteInitialState = {
  voteStatus: {
    memberAgreed: false,
    memberDisagreed: false,
  },
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
      // state.subscribers = [...state.subscribers, action.payload];
      state.subscribers.push(action.payload);
    },
    removeRoomSubscriber: (state, action) => {
      const index = state.subscribers.indexOf(action.payload.streamManager, 0);
      if (index > -1) {
        state.subscribers.splice(index, 1);
      }
    },
    removeAllRoomSubscribers: (state) => {
      state.subscribers = [];
    },
    setRemoteHandsUpStatus: (state, action) => {
      state.remoteHandsUpStatus.push(action.payload);
    },
    setRemotePermissionStatus: (state, action) => {
      state.remotePermissionStatus.push(action.payload);
    },
    setRemoteForceMuteStatus: (state, action) => {
      state.remoteForceMuteStatus.push(action.payload);
    },
    setJoinRoomStatus: (state, action) => {
      state.joinRoomStatus = action.payload;
    },
  },
});

export const voteSlice = createSlice({
  name: 'vote',
  initialState: voteInitialState,
  reducers: {
    setMemberVoteStatus: (state, action) => {
      state.voteStatus = action.payload;
    },
  },
});

export const {
  setRoomInfo,
  setRoomSubscribers,
  setRemoteHandsUpStatus,
  setRemotePermissionStatus,
  setJoinRoomStatus,
  removeRoomSubscriber,
  removeAllRoomSubscribers,
  setRemoteForceMuteStatus,
} = roomSlice.actions;
export const { setSession } = sessionSlice.actions;
export const { setMemberVoteStatus } = voteSlice.actions;
const reducer = combineReducers({
  room: roomSlice.reducer,
  session: sessionSlice.reducer,
  vote: voteSlice.reducer,
});

export default reducer;
