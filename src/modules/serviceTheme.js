import { createSlice } from '@reduxjs/toolkit';

const themeInitialState = {
  dark: false,
};

export const themeSlice = createSlice({
  name: 'theme',
  initialState: themeInitialState,
  reducers: {
    setDarkTheme: (state, action) => {
      state.dark = action.payload;
    },
  },
});

export const { setDarkTheme } = themeSlice.actions;

// selector setting
export const selectDarkTheme = (state) => state.theme.dark;

export default themeSlice.reducer;
