import { createSlice } from '@reduxjs/toolkit';

const modalInitialState = {
  open: false,
};

export const modalSlice = createSlice({
  name: 'modal',
  initialState: modalInitialState,
  reducers: {
    setModalOpen: (state, action) => {
      state.open = action.payload;
    },
  },
});

export const { setModalOpen } = modalSlice.actions;

// selector setting
export const selectModalOpen = (state) => state.modals;

export default modalSlice.reducer;
