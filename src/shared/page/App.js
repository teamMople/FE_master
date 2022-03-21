import React, { useState, useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { getCookie } from '../utils/Cookie';
import {
  Splash,
  Home,
  Nav,
  Login,
  MyAccount,
  AlarmList,
  OAuthRedirectHandler,
  FindPassword,
  Signup,
  Welcome,
  EditUserProfile,
  SearchBoard,
  SearchResult,
  CreateBoard,
  BoardList,
  Settings,
  NotFound,
  Test,
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
  const [isLogin, setIsLogin] = useState(false);
  const [showNav, setShowNav] = useState(false);

  // 임시 (액세스 토큰 받으면 setIsLogin(true) 처리 예정)
  console.log(window.location.pathname);
  const locationArray = [
    '/',
    '/login',
    '/signup',
    '/welcome',
    '/list',
    '/settings',
    '/editmyprofile',
  ];

  // 테마 변경 값 로컬 스토리지에 저장해야함!
  const changeTheme = () => {
    if (theme === lightTheme) setTheme(darkTheme);
    else {
      setTheme(lightTheme);
    }
  };

  useEffect(() => {
    // 임시
    console.log(isLogin);
    if (locationArray.indexOf(window.location.pathname) !== -1) {
      setShowNav(false);
    } else {
      setShowNav(true);
    }
  }, [window.location.pathname]);

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
          <Route path="/search" element={<SearchBoard />}>
            <Route path="result" element={<BoardList />} />
          </Route>
          <Route path="/list" element={<BoardList />} />
          <Route path="/createboard" element={<CreateBoard />} />
          <Route path="/myaccount" element={<MyAccount />}>
            <Route path="boards" element={<BoardList />} />
            <Route path="comments" element={<BoardList />} />
          </Route>
          <Route path="/editmyprofile" element={<EditUserProfile />} />
          <Route path="/findpassword" element={<FindPassword />} />
          <Route path="/alarm" element={<AlarmList />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/modal" element={<Test />} />
          <Route path={'/voice'} element={<ChatRoomList />} />
          <Route path={'/voice/create'} element={<CreateChatRoom />} />
          <Route path={'/voice/:roomId'} element={<VoiceRoom />} />
          <Route path={'*'} element={<NotFound />} />
        </Routes>
        <Nav active={showNav} />
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
