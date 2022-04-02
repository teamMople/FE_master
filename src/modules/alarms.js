import React from 'react';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import apis from '../apis/apis';

const alarmListInitialState = {
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

export const alarmSlice = createSlice({
  name: 'alarms',
  initialState: alarmListInitialState,
  reducers: {
    addAlarmList: (state, action) => {
      console.log(action);
      state.data.push(action.payload);
    },
  },
  extraReducers: {},
});

export const { addAlarmList } = alarmSlice.actions;
export const selectedAlarmList = (state) => state.alarms.data;
