import React from 'react';
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
  );
}

export default App;
