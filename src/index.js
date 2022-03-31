import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './shared/page/App';
import reportWebVitals from './reportWebVitals';

import { Provider } from 'react-redux';
import store from './modules/configStore';
import GlobalStyle from './shared/styles/globalStyles';

// Register service worker for Firebase Cloud Messenger
if ('serviceWorker' in navigator) {
  navigator.serviceWorker
    .register('./firebase-messaging-sw.js')
    .then(function (registration) {
      console.log('Registration successful, scope is:', registration.scope);
    })
    .catch(function (err) {
      console.log('Service worker registration failed, error:', err);
    });
}

ReactDOM.render(
  <Provider store={store}>
    <GlobalStyle />
    <App />
  </Provider>,
  document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
