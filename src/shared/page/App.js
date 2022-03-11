import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { Main, Login, Signup, Welcome } from '../../pages';
import '../styles/App.css';
import theme from '../../components/theme';

import history from '../utils/history';
import { ThemeProvider } from 'styled-components';

import CreateChatRoom from '../../chatTestDir/CreateChatRoom';
import VoiceRoom from '../../chatTestDir/VoiceRoom';
import ChatRoomList from '../../chatTestDir/ChatRoomList';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter history={history}>
        <Routes>
          <Route path="/main" element={<Main />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/welcome" element={<Welcome />} />
          <Route path={'/'} element={<ChatRoomList />} />
          <Route path={'/voice/create'} element={<CreateChatRoom />} />
          <Route path={'/voice/:roomId'} element={<VoiceRoom />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
