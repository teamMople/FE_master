import React, { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import { Main, Login, Signup, Welcome } from '../../pages';
import '../styles/App.css';

import { darkTheme, lightTheme } from '../styles/theme';
import history from '../utils/history';
import { ThemeProvider } from 'styled-components';

import CreateRoom from '../../chatTestDir/LiveRoom/CreateRoom';
import LiveRoom from '../../chatTestDir/LiveRoom/LiveRoom';
import RoomList from '../../chatTestDir/LiveRoom/RoomList';

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
        <button style={{ position: 'fixed', right: 0 }} onClick={changeTheme}>
          테마변경
        </button>
        <Routes>
          <Route path="/main" element={<Main />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/welcome" element={<Welcome />} />
          <Route path={'/room'} element={<RoomList />} />
          <Route path={'/room/create'} element={<CreateRoom />} />
          <Route path={'/room/:roomId'} element={<LiveRoom />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
