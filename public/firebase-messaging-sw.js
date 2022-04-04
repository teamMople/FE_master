import { initializeApp } from 'firebase/app';
import { getMessaging } from 'firebase/messaging/sw';

const firebaseApp = initializeApp({
  apiKey: 'AIzaSyD0u9HX41rjh3MnO93isinkSuxzLEH22GI',
  authDomain: 'boiler-e3497.firebaseapp.com',
  projectId: 'boiler-e3497',
  storageBucket: 'boiler-e3497.appspot.com',
  messagingSenderId: '128639882477',
  appId: '1:128639882477:web:4e0c086f572ce6b9a468e4',
  measurementId: 'G-V83CYYD10V',
});

const messaging = getMessaging(firebaseApp);
