import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';

import {
  Home,
  Login,
  OAuthRedirectHandler,
  Signup,
  Welcome,
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
          <Route path="/" element={<Home />} />
          <Route path="/api" element={<Login />}>
            <Route
              path="google"
              element={<OAuthRedirectHandler provider={'google'} />}
            />
            <Route
              path="naver"
              element={<OAuthRedirectHandler provider={'naver'} />}
            />
            <Route
              path="kakao"
              element={<OAuthRedirectHandler provider={'kakao'} />}
            />
          </Route>
          <Route path="/signup" element={<Signup />} />
          <Route path="/welcome" element={<Welcome />} />
          <Route path={'/voice'} element={<ChatRoomList />} />
          <Route path={'/voice/create'} element={<CreateChatRoom />} />
          <Route path={'/voice/:roomId'} element={<VoiceRoom />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
