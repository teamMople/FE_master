import React, { useState, Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import apis from 'apis/apis';

import {
  Splash,
  // Home,
  Nav,
  // Login,
  MyAccount,
  NotificationList,
  OAuthRedirectHandler,
  FindPassword,
  // Signup,
  Welcome,
  EditUserProfile,
  // SearchBoard,
  BoardByCategoryList,
  CreateBoard,
  BoardDetail,
  BoardList,
  LiveBoardList,
  Settings,
  NotFound,
  CombinedBoardList,
  Loading,
} from '../../pages';
import '../styles/App.css';

import { darkTheme, lightTheme } from '../styles/theme';
import history from '../utils/history';
import { ThemeProvider } from 'styled-components';

import CreateRoom from '../../pages/chats/views/CreateRoom/CreateRoom';
import LiveRoom from '../../pages/chats/views/LiveRoom/LiveRoom';
import { Home, Login, RoomList, SearchBoard, Signup } from './LazyPages';
import GlobalStyle from '../styles/globalStyles';
import { PageLoading, Report } from 'components';

import { initializeApp } from 'firebase/app';
import { firebaseConfig } from 'shared/utils/firebase';
import { getMessaging, getToken, onMessage } from 'firebase/messaging';
import { useDispatch } from 'react-redux';
import { addNotificationList } from 'modules/notifications';

function App() {
  const dispatch = useDispatch();

  // Theme
  const [theme, setTheme] = useState(lightTheme);

  // 테마 변경 값 로컬 스토리지에 저장해야함!
  const changeTheme = () => {
    if (theme === lightTheme) setTheme(darkTheme);
    else {
      setTheme(lightTheme);
    }
  };

  // Firebase Cloud Messaging
  const firebaseApp = initializeApp(firebaseConfig);
  const firebaseMessaging = getMessaging(firebaseApp);

  getToken(firebaseMessaging, {
    vapidKey: process.env.REACT_APP_VAPID_KEY,
  })
    .then((currentToken) => {
      console.log(currentToken);
      if (currentToken) {
        apis.pushAlarm(currentToken).then((response) => {
          console.log(response);
        });
      } else {
        console.log('not alarm registered');
      }
    })
    .catch((error) => console.log(error));

  onMessage(firebaseMessaging, (payload) => {
    console.log('foregroundMessage');
    console.log(payload);

    const date = new Date();
    const now = date.getTime();

    if (payload) {
      dispatch(
        addNotificationList({
          title: payload.notification.title,
          body: payload.notification.body,
          createdAt: now,
        }),
      );
    }
  });

  // Webpack production mode
  if (process.env.NODE_ENV === 'production') {
    console.log = function no_console() {};
    console.warn = function no_console() {};
  }

  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <BrowserRouter history={history}>
        {/*잠시 임시로 넣어놓았습니다.*/}
        {/*<button style={{ position: 'fixed', right: 0 }} onClick={changeTheme}>*/}
        {/*  테마변경*/}
        {/*</button>*/}
        <Suspense fallback={<PageLoading />}>
          <Routes>
            <Route path="/" element={<Splash />} />
            <Route path="/page-loading" element={<PageLoading />} />
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
              <Route path="result" element={<CombinedBoardList />} />
              <Route path="result/general" element={<CombinedBoardList />} />
              <Route path="result/live" element={<CombinedBoardList />} />
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
            <Route path="/noti" element={<NotificationList />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/loading" element={<Loading />} />
            <Route path={'*'} element={<NotFound />} />
          </Routes>
        </Suspense>
        <Nav />
        <Report />
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
