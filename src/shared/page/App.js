import React, { useEffect, Suspense } from 'react';
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
  Inactivate,
  ChangePassword,
  ReportBoard,
} from 'pages';
import '../styles/App.css';

import { darkTheme, lightTheme } from '../styles/theme';
import history from '../utils/history';
import { ThemeProvider } from 'styled-components';

import CreateRoom from '../../pages/chats/views/CreateRoom/CreateRoom';
import LiveRoom from '../../pages/chats/views/LiveRoom/LiveRoom';
import { Home, Login, RoomList, SearchBoard, Signup } from './LazyPages';
import GlobalStyle from '../styles/globalStyles';
import { PageLoading } from 'components';

import { firebaseApp } from 'shared/utils/firebase';
import { getMessaging, getToken, onMessage } from 'firebase/messaging';
import { useDispatch, useSelector } from 'react-redux';
import { addNotificationList } from 'modules/notifications';
import { selectDarkTheme } from '../../modules/serviceTheme';
import AllBoardList from '../../pages/boards/AllBoardList';

function App() {
  const dispatch = useDispatch();

  // Firebase Cloud Messaging
  // const firebaseMessaging = getMessaging(firebaseApp);
  // getToken(firebaseMessaging, {
  //   vapidKey: process.env.REACT_APP_VAPID_KEY,
  // })
  //   .then((currentToken) => {
  //     console.log(currentToken);
  //     if (currentToken) {
  //       apis.pushAlarm(currentToken).then((response) => {
  //         console.log(response);
  //       });
  //     } else {
  //       console.log('not alarm registered');
  //     }
  //   })
  //   .catch((error) => console.log(error));

  // onMessage(firebaseMessaging, (payload) => {
  //   console.log('foregroundMessage');
  //   console.log(payload);

  //   const date = new Date();
  //   const now = date.getTime();

  //   if (payload) {
  //     dispatch(
  //       addNotificationList({
  //         title: payload.notification.title,
  //         body: payload.notification.body,
  //         createdAt: now,
  //       }),
  //     );
  //   }
  // });

  // Webpack production mode
  if (process.env.NODE_ENV === 'production') {
    console.log = function no_console() {};
    console.warn = function no_console() {};
  }

  // 마이크 사용 요청 to user
  useEffect(() => {
    getLocalStream();
  }, []);
  function getLocalStream() {
    navigator.mediaDevices
      .getUserMedia({ video: false, audio: true })
      .then((stream) => {
        window.localStream = stream; // A
      })
      .catch((err) => {
        console.log('u got an error:' + err);
      });
  }

  // 테마 변경
  const darkThemeState = useSelector(selectDarkTheme);

  useEffect(() => {
    themeState();
  }, [darkThemeState]);

  const themeState = () => {
    if (localStorage.getItem('theme') === 'dark') {
      return darkTheme;
    } else {
      return lightTheme;
    }
  };

  return (
    <ThemeProvider theme={themeState}>
      <GlobalStyle />
      <BrowserRouter history={history}>
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
            <Route path="/recent" element={<AllBoardList type={'recent'} />} />
            <Route path="/hot" element={<AllBoardList type={'hot'} />} />
            <Route path="/search" element={<SearchBoard />}>
              <Route path="result" element={<CombinedBoardList />} />
              <Route path="result/general" element={<CombinedBoardList />} />
              <Route path="result/live" element={<CombinedBoardList />} />
            </Route>
            <Route path="/list">
              <Route
                path=":categoryName"
                element={<BoardByCategoryList from={'/home'} to={'/list/'} />}
              >
                <Route path="live" element={<LiveBoardList />} />
                <Route path="general" element={<BoardList />} />
              </Route>
            </Route>
            {/*<Route path="/livelist" element={<LiveBoardList />}>*/}
            {/*  <Route path=":categoryName" element={<LiveBoardList />} />*/}
            {/*</Route>*/}
            <Route path="/category">
              <Route
                path=":categoryName"
                element={
                  <BoardByCategoryList from={'/search'} to={'/category/'} />
                }
              >
                <Route path="live" element={<LiveBoardList />} />
                <Route path="general" element={<BoardList />} />
              </Route>
            </Route>
            <Route path="/board/:boardId" element={<BoardDetail />} />
            <Route path="board/report/:boardId" element={<ReportBoard />} />
            <Route path="/createboard" element={<CreateBoard />} />
            <Route path="/myaccount" element={<MyAccount />}>
              <Route path="boards" element={<BoardList />} />
              <Route path="comments" element={<BoardList />} />
            </Route>
            <Route path="/editmyprofile" element={<EditUserProfile />} />
            <Route path="/findpassword" element={<FindPassword />} />
            <Route path="/changepassword" element={<ChangePassword />} />
            <Route path="/inactivate" element={<Inactivate />} />
            <Route path="/noti" element={<NotificationList />} />
            <Route path="/settings" element={<Settings />} />
            <Route path="/loading" element={<Loading />} />
            <Route path={'*'} element={<NotFound />} />
          </Routes>
        </Suspense>
        <Nav />
        {/*<Report />*/}
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
