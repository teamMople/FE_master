import { createSlice } from '@reduxjs/toolkit';

const socketInitialState = {
  stomp: {
    voteStomp: undefined,
    messageStomp: undefined,
  },
};

export const socketSlice = createSlice({
  name: 'socket',
  initialState: socketInitialState,
  reducers: {
    setMessageStomp: (state, action) => {
      state.stomp.messageStomp = action.payload;
    },
  },
});

export const { setMessageStomp } = socketSlice.actions;
export const selectedSocket = (state) => state.socket.stomp;
export default socketSlice.reducer;
