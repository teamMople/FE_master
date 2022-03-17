import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import {
  Splash,
  Home,
  Nav,
  Login,
  MyAccount,
  OAuthRedirectHandler,
  Signup,
  Welcome,
  SearchBoard,
  Settings,
} from '../../pages';
import '../styles/App.css';

import { darkTheme, lightTheme } from '../styles/theme';
import history from '../utils/history';
import { ThemeProvider } from 'styled-components';

import CreateChatRoom from '../../chatTestDir/CreateChatRoom';
import VoiceRoom from '../../chatTestDir/VoiceRoom';
import ChatRoomList from '../../chatTestDir/ChatRoomList';

function App() {
  const [theme, setTheme] = useState(lightTheme);

  // 테마 변경 값 로컬 스토리지에 저장해야함!
  const changeTheme = () => {
    if (theme === lightTheme) setTheme(darkTheme);
    else {
      setTheme(lightTheme);
    }
  };

  useEffect(() => {}, []);

  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter history={history}>
        {/* 잠시 임시로 넣어놓았습니다. */}
        <button style={{ position: 'fixed', right: 0 }} onClick={changeTheme}>
          테마변경
        </button>
        <Routes>
          <Route path="/" element={<Splash />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/api/kakao/login"
            element={<OAuthRedirectHandler provider={'kakao'} />}
          />
          <Route path="/signup" element={<Signup />} />
          <Route path="/welcome" element={<Welcome />} />
          <Route path="/home" element={<Home />} />
          <Route path="/search" element={<SearchBoard />} />
          <Route path="/myaccount" element={<MyAccount />} />
          <Route path="/settings" element={<Settings />} />
          <Route path={'/voice'} element={<ChatRoomList />} />
          <Route path={'/voice/create'} element={<CreateChatRoom />} />
          <Route path={'/voice/:roomId'} element={<VoiceRoom />} />
        </Routes>
        <Nav />
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
