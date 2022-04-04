importScripts('https://www.gstatic.com/firebasejs/7.6.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/7.6.1/firebase-messaging.js');
importScripts('https://www.gstatic.com/firebasejs/7.2.1/firebase-analytics.js');

firebase.initializeApp({
  messagingSenderId: '128639882477',
});

const messaging = firebase.messaging();
