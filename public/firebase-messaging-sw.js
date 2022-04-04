// Scripts for firebase and firebase messaging
importScripts(
  'https://www.gstatic.com/firebasejs/9.0.0/firebase-app-compat.js',
);
importScripts(
  'https://www.gstatic.com/firebasejs/9.0.0/firebase-messaging-compat.js',
);

// Initialize the Firebase app in the service worker by passing the generated config
var firebaseConfig = {
  apiKey: 'AIzaSyD0u9HX41rjh3MnO93isinkSuxzLEH22GI',
  authDomain: 'boiler-e3497.firebaseapp.com',
  projectId: 'boiler-e3497',
  storageBucket: 'boiler-e3497.appspot.com',
  messagingSenderId: '128639882477',
  appId: '1:128639882477:web:4e0c086f572ce6b9a468e4',
};

firebase.initializeApp(firebaseConfig);

// Retrieve firebase messaging
const messaging = firebase.messaging();

messaging.onBackgroundMessage(function (payload) {
  console.log('Received background message ', payload);

  const notificationTitle = payload.notification.title;
  const notificationOptions = {
    body: payload.notification.body,
  };

  self.registration.showNotification(notificationTitle, notificationOptions);
});
