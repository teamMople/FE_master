importScripts('https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js');
importScripts(
  'https://www.gstatic.com/firebasejs/8.10.0/firebase-messaging.js',
);

firebase.initializeApp({
  messagingSenderId: '128639882477',
  apiKey: 'AIzaSyD0u9HX41rjh3MnO93isinkSuxzLEH22GI',
  authDomain: 'boiler-e3497.firebaseapp.com',
  projectId: 'boiler-e3497',
  storageBucket: 'boiler-e3497.appspot.com',
  messagingSenderId: '128639882477',
  appId: '1:128639882477:web:4e0c086f572ce6b9a468e4',
  measurementId: 'G-V83CYYD10V',
});

const messaging = firebase.messaging();
