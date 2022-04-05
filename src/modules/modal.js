import { createSlice } from '@reduxjs/toolkit';

const modalInitialState = {
  state: {
    open: false,
    type: '', // 'close' or 'leave'
  },
};

export const modalSlice = createSlice({
  name: 'modal',
  initialState: modalInitialState,
  reducers: {
    setModalOpen: (state, action) => {
      state.state = action.payload;
    },
  },
});

export const { setModalOpen } = modalSlice.actions;

// selector setting
export const selectModalOpen = (state) => state.modals.state;

export default modalSlice.reducer;
