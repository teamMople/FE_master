import { initializeApp } from 'firebase/app';
import firebase from 'firebase';

const firebaseConfig = {
  apiKey: 'AIzaSyD0u9HX41rjh3MnO93isinkSuxzLEH22GI',
  authDomain: 'boiler-e3497.firebaseapp.com',
  projectId: 'boiler-e3497',
  storageBucket: 'boiler-e3497.appspot.com',
  messagingSenderId: '128639882477',
  appId: '1:128639882477:web:4e0c086f572ce6b9a468e4',
  measurementId: 'G-V83CYYD10V',
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
