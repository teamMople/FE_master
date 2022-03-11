import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
<<<<<<< HEAD
<<<<<<< HEAD
import App from './shared/page/App';
=======
>>>>>>> main
=======
import App from './shared/page/App';
>>>>>>> f447579d82aef4f7284c45ca951190a1bf95435e
import reportWebVitals from './reportWebVitals';

import { Provider } from 'react-redux';
import store from './modules/configStore';
<<<<<<< HEAD
<<<<<<< HEAD
=======
import App from './shared/page/App';
>>>>>>> main
=======
>>>>>>> f447579d82aef4f7284c45ca951190a1bf95435e

ReactDOM.render(
  <Provider store={store}>
    <App />
  </Provider>,
  document.getElementById('root'),
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
