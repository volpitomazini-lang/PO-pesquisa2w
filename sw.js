// Arquivo: sw.js
// Esse código garante que o PWA seja reconhecido pelo Android sem travar

self.addEventListener('install', (event) => {
  self.skipWaiting();
});

self.addEventListener('activate', (event) => {
  event.waitUntil(clients.claim());
});

self.addEventListener('fetch', (event) => {
  // Apenas permite a passagem das requisições (essencial para evitar 404 no Android)
  event.respondWith(fetch(event.request));
});
