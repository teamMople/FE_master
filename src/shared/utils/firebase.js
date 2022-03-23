import { initializeApp } from 'firebase/app';
import firebase from 'firebase';

const firebaseConfig = {
  apiKey: 'AIzaSyDWCUM0tYnV_CIUSNxsDjFMQQ3-13KBJ78',
  authDomain: 'boilerplate-939c9.firebaseapp.com',
  projectId: 'boilerplate-939c9',
  storageBucket: 'boilerplate-939c9.appspot.com',
  messagingSenderId: '2750121616',
  appId: '1:2750121616:web:0a6a5b20d0f39827827a15',
};

firebase.initializeApp(firebaseConfig);
const messaging = firebase.messaging();
messaging
  .requestPermission()
  .then(() => {
    console.log('permission');
    return messaging.getToken();
  })
  .then((token) => {
    console.log(token);
  })
  .catch((e) => {
    console.log(e);
  });
