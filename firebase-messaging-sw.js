// LearnPro — Firebase Cloud Messaging Service Worker
importScripts('https://www.gstatic.com/firebasejs/10.12.0/firebase-app-compat.js');
importScripts('https://www.gstatic.com/firebasejs/10.12.0/firebase-messaging-compat.js');

firebase.initializeApp({
  apiKey: "AIzaSyA5aVDaKHlPmssghJp7b9s1QxzeDWvnaeE",
  authDomain: "learnpro-89b93.firebaseapp.com",
  projectId: "learnpro-89b93",
  appId: "1:246874100868:web:b8073a1a1bc8faf1f8ded1"
});

const messaging = firebase.messaging();

// Handle background push notifications
messaging.onBackgroundMessage((payload) => {
  const { title, body, icon } = payload.notification;
  self.registration.showNotification(title || 'LearnPro', {
    body: body || 'You have a new notification!',
    icon: icon || '/favicon.ico',
    badge: '/favicon.ico',
    data: payload.data,
    actions: [
      { action: 'open', title: 'Open LearnPro' },
      { action: 'dismiss', title: 'Dismiss' }
    ]
  });
});

// Handle notification click
self.addEventListener('notificationclick', (event) => {
  event.notification.close();
  if (event.action === 'open' || !event.action) {
    event.waitUntil(clients.openWindow('/pages/dashboard.html'));
  }
});
