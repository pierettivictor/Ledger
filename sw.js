const CACHE = 'ledger-v6';
const BASE = self.location.pathname.replace(/\/sw\.js$/, '');
const FILES = [BASE + '/', BASE + '/index.html', BASE + '/manifest.json', BASE + '/icon-192.png', BASE + '/icon-512.png'];
self.addEventListener('install', e => {
  self.skipWaiting();
  e.waitUntil(caches.open(CACHE).then(c => Promise.allSettled(FILES.map(f => c.add(f)))));
});
self.addEventListener('activate', e => {
  e.waitUntil(caches.keys().then(keys =>
    Promise.all(keys.filter(k => k !== CACHE).map(k => caches.delete(k)))
  ).then(() => self.clients.claim()));
});
self.addEventListener('fetch', e => {
  e.respondWith(caches.match(e.request).then(r => r || fetch(e.request)));
});
