import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

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
  BoardByCategoryList,
  CreateBoard,
  BoardDetail,
  BoardList,
  LiveBoardList,
  Settings,
  NotFound,
} from '../../pages';
import '../styles/App.css';

import { darkTheme, lightTheme } from '../styles/theme';
import history from '../utils/history';
import { ThemeProvider } from 'styled-components';

import CreateRoom from '../../pages/chats/CreateRoom';
import LiveRoom from '../../pages/chats/LiveRoom';
import RoomList from '../../pages/chats/RoomList';

function App() {
  const [theme, setTheme] = useState(lightTheme);

  // 테마 변경 값 로컬 스토리지에 저장해야함!
  const changeTheme = () => {
    if (theme === lightTheme) setTheme(darkTheme);
    else {
      setTheme(lightTheme);
    }
  };

  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter history={history}>
        {/* 잠시 임시로 넣어놓았습니다. */}
        {/*<button style={{ position: 'fixed', right: 0 }} onClick={changeTheme}>*/}
        {/*  테마변경*/}
        {/*</button>*/}
        <Routes>
          <Route path="/" element={<Splash />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/api/kakao/login"
            element={<OAuthRedirectHandler provider={'kakao'} />}
          />
          <Route path="/signup" element={<Signup />} />
          <Route path="/welcome" element={<Welcome />} />
          <Route path={'/room'} element={<RoomList />} />
          <Route path={'/room/create'} element={<CreateRoom />} />
          <Route path={'/room/:roomId'} element={<LiveRoom />} />
          <Route path="/home" element={<Home />} />
          <Route path="/search" element={<SearchBoard />}>
            <Route path="result" element={<BoardList />} />
            <Route path="result/general" element={<BoardList />} />
            <Route path="result/live" element={<BoardList />} />
          </Route>
          <Route path="/list" element={<BoardList />}>
            <Route path=":categoryName" element={<BoardList />} />
          </Route>
          <Route path="/livelist" element={<LiveBoardList />}>
            <Route path=":categoryName" element={<LiveBoardList />} />
          </Route>
          <Route path="/category">
            <Route path=":categoryName" element={<BoardByCategoryList />}>
              <Route path="live" element={<LiveBoardList />} />
              <Route path="general" element={<BoardList />} />
            </Route>
          </Route>
          <Route path="/board/:boardId" element={<BoardDetail />} />
          <Route path="/createboard" element={<CreateBoard />} />
          <Route path="/myaccount" element={<MyAccount />}>
            <Route path="boards" element={<BoardList />} />
            <Route path="comments" element={<BoardList />} />
          </Route>
          <Route path="/editmyprofile" element={<EditUserProfile />} />
          <Route path="/findpassword" element={<FindPassword />} />
          <Route path="/alarm" element={<AlarmList />} />
          <Route path="/settings" element={<Settings />} />
          <Route path={'*'} element={<NotFound />} />
        </Routes>
        <Nav />
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
