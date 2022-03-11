import React from 'react';
<<<<<<< HEAD
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { Main, Login, Signup, Welcome } from '../../pages';
import '../styles/App.css';
import theme from '../../components/theme';

import history from '../utils/history';
import { ThemeProvider } from 'styled-components';

function App() {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter history={history}>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/welcome" element={<Welcome />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
=======
import '../styles/App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import CreateChatRoom from '../../chatTestDir/CreateChatRoom';
import VoiceRoom from '../../chatTestDir/VoiceRoom';
import ChatRoomList from '../../chatTestDir/ChatRoomList';

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <Routes>
          <Route path={'/'} element={<ChatRoomList />} />
          <Route path={'/voice/create'} element={<CreateChatRoom />} />
          <Route path={'/voice/:roomId'} element={<VoiceRoom />} />
        </Routes>
      </div>
    </BrowserRouter>
>>>>>>> main
  );
}

export default App;
