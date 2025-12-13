const cacheName = 'examsaarthi-v1';
const filesToCache = [
  '/',
  '/index.html',
  '/universities.html',
  '/about.html',
  '/contact.html',
  '/logo.png',
  '/style.css',
  '/script.js'
];

// Install event
self.addEventListener('install', event => {
  event.waitUntil(
    caches.open(cacheName).then(cache => cache.addAll(filesToCache))
  );
});

// Fetch event
self.addEventListener('fetch', event => {
  event.respondWith(
    caches.match(event.request).then(resp => resp || fetch(event.request))
  );
});
