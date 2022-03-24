importScripts('https://www.gstatic.com/firebasejs/8.10.0/firebase-app.js');
importScripts(
  'https://www.gstatic.com/firebasejs/8.10.0/firebase-messaging.js',
);

const config = {
  apiKey: 'AIzaSyD0u9HX41rjh3MnO93isinkSuxzLEH22GI',
  authDomain: 'boiler-e3497.firebaseapp.com',
  projectId: 'boiler-e3497',
  storageBucket: 'boiler-e3497.appspot.com',
  messagingSenderId: '128639882477',
  appId: '1:128639882477:web:4e0c086f572ce6b9a468e4',
  measurementId: 'G-V83CYYD10V',
};

firebase.initializeApp(config);

const messaging = firebase.messaging();
messaging.setBackgroundMessageHandler(function (payload) {
  const promiseChain = clients
    .matchAll({
      type: 'window',
      includeUncontrolled: true,
    })
    .then((windowClients) => {
      for (let i = 0; i < windowClients.length; i++) {
        const windowClient = windowClients[i];
        console.log(payload);
        windowClient.postMessage(payload);
      }
    })
    .then(() => {
      return registration.showNotification('my notification title');
    });
  return promiseChain;
});
self.addEventListener('notificationclick', function (event) {
  // do what you want
  // ...
  console.log('sdf');
});
