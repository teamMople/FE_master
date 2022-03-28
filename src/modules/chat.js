import {
  combineReducers,
  createAsyncThunk,
  createSlice,
} from '@reduxjs/toolkit';
import apis from '../apis/apis';

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
  roomState: {
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
  openRoomState: false,
  createRoomState: {
    openCreateRoom: false,
    createRoomNextStep: false,
    createRoomSetting: false,
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

const chatInitialState = {
  data: {},
  hide: false,
};

export const ovGetTokenAsync = createAsyncThunk(
  'chat/ovGetToken',
  async (data) => {
    return await apis.ovGetToken(data);
  },
);

export const ovDeleteTokenAsync = createAsyncThunk(
  'chat/ovDeleteToken',
  async (data) => {
    return await apis.ovDeleteToken(data);
  },
);

export const closeRoomAsync = createAsyncThunk(
  'chat/closeRoom',
  async (data) => {
    return await apis.closeRoom(data);
  },
);

export const sessionSlice = createSlice({
  name: 'session',
  initialState: sessionInit,
  reducers: {
    setSession: (state, action) => {
      state.mySession = action.payload;
    },
  },
});

export const createRoomAsync = createAsyncThunk(
  'chat/createRoom',
  async ({ data, memberName, role }) => {
    return await apis
      .createRoom(data)
      .then((res) => {
        const status = {
          role: role,
          roomId: res.data.roomId,
          roomName: res.data.roomName,
          category: res.data.category,
          moderatorId: res.data.moderatorId,
          moderatorNickname: res.data.moderatorNickname,
          maxParticipantCount: res.data.maxParticipantCount,
          content: res.data.content,
          isPrivate: res.data.isPrivate,
          agreeCount: res.data.agreeCount,
          disagreeCount: res.data.disagreeCount,
          onAir: res.data.onAir,
          createdAt: res.data.createdAt,
          memberAgreed: res.data.memberAgreed,
          memberDisagreed: res.data.memberDisagreed,
          memberName: memberName,
          accessToken: undefined,
        };

        return status;
      })
      .catch((err) => console.log(err));
  },
);

export const joinRoomAsync = createAsyncThunk(
  'chat/joinRoom',
  async ({ data, memberName, role }) => {
    return await apis
      .joinRoom(data)
      .then((res) => {
        const status = {
          role: role,
          roomId: res.data.roomId,
          roomName: res.data.roomName,
          category: res.data.category,
          moderatorId: res.data.moderatorId,
          moderatorNickname: res.data.moderatorNickname,
          maxParticipantCount: res.data.maxParticipantCount,
          content: res.data.content,
          isPrivate: res.data.isPrivate,
          agreeCount: res.data.agreeCount,
          disagreeCount: res.data.disagreeCount,
          onAir: res.data.onAir,
          createdAt: res.data.createdAt,
          memberAgreed: res.data.memberAgreed,
          memberDisagreed: res.data.memberDisagreed,
          memberName: memberName,
          // accessToken: undefined,
        };
        console.log('joinRoom : ', status);
        return status;
      })
      .catch((err) => console.log(err));
  },
);

export const leaveRoomAsync = createAsyncThunk(
  'chat/leaveRoom',
  async (data) => {
    return await apis
      .leaveRoom(data)
      .then(() => {
        //!Todo 주석 풀 것
        // return alert('방 떠나기 성공!');
      })
      .catch(() => alert('방 떠나기 실패!'));
  },
);

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
    setOpenRoomState: (state, action) => {
      state.openRoomState = action.payload;
    },
    setOpenCreateRoom: (state, action) => {
      state.createRoomState.openCreateRoom = action.payload;
    },
    setCreateRoomNextStep: (state, action) => {
      state.createRoomState.createRoomNextStep = action.payload;
    },
    setCreateRoomSetting: (state, action) => {
      state.createRoomState.createRoomSetting = action.payload;
    },
  },
  extraReducers: {
    [createRoomAsync.fulfilled]: (state, action) => {
      state.roomState = action.payload;
      // state.createRoomStatus = action.payload.createRoomStatus;
    },
    [joinRoomAsync.fulfilled]: (state, action) => {
      state.roomState = action.payload;
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

export const chatSlice = createSlice({
  name: 'chat',
  initialState: chatInitialState,
  reducers: {
    setChatContent: (state, action) => {
      state.data = action.payload;
    },
    hideChat: (state, action) => {
      state.hide = action.payload;
    },
  },
});

export const {
  setRoomInfo,
  setRoomSubscribers,
  setRemoteHandsUpStatus,
  setRemotePermissionStatus,
  removeRoomSubscriber,
  setJoinRoomStatus,
  removeAllRoomSubscribers,
  setRemoteForceMuteStatus,
  setOpenRoomState,
  setOpenCreateRoom,
  setCreateRoomNextStep,
  setCreateRoomSetting,
} = roomSlice.actions;
export const { setSession } = sessionSlice.actions;
export const { setMemberVoteStatus } = voteSlice.actions;
export const { setChatContent, hideChat } = chatSlice.actions;

// selector setting
export const selectOpenRoomState = (state) => state.chats.room.openRoomState;
export const selectCreateRoomState = (state) =>
  state.chats.room.createRoomState;
export const selectRoomState = (state) => state.chats.room.roomState;
export const selectChatState = (state) => state.chats.chat.data;
export const selectChatHideState = (state) => state.chats.chat.hide;

const reducer = combineReducers({
  room: roomSlice.reducer,
  session: sessionSlice.reducer,
  vote: voteSlice.reducer,
  chat: chatSlice.reducer,
});

export default reducer;
