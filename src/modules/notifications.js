import React from 'react';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import apis from '../apis/apis';

const notificationListInitialState = {
  data: [],
};

export const sendFirebaseCloudMessagingToken = createAsyncThunk(
  'alarm/sendFirebaseCloudMessagingToken',
  async (token, thunkAPI) => {
    const response = await apis.pushAlarm(token);
    console.log(response);
    return response.data;
  },
);

export const notificationSlice = createSlice({
  name: 'notifications',
  initialState: notificationListInitialState,
  reducers: {
    addNotificationList: (state, action) => {
      state.data.push(action.payload);
    },
    createNewNotification: (state, action) => {
      const date = new Date();
      const now = date.getTime();
      state.data.push({
        title: action.payload.title,
        body: action.payload.body,
        createdAt: now,
      });
    },
  },
  extraReducers: {},
});

export const { addNotificationList, createNewNotification } =
  notificationSlice.actions;
export const selectedNotificationList = (state) => state.notifications.data;
export default notificationSlice.reducer;
