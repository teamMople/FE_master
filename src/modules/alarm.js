import React from 'react';
import { createAsyncThunk } from '@reduxjs/toolkit';
import apis from '../apis/apis';

export const sendFirebaseCloudMessagingToken = createAsyncThunk(
  'alarm/sendFirebaseCloudMessagingToken',
  async (token, thunkAPI) => {
    const response = await apis.pushAlarm(token);
    console.log(response);
    return response.data;
  },
);
