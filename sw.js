const CACHE_NAME = 'peo-cache-v1';
const assets = [
  './',
  './index.html',
  './manifest.json'
];

// Instala o Service Worker e armazena os arquivos no cache
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('P e O: Arquivos em cache');
      return cache.addAll(assets);
    })
  );
});

// Responde com os arquivos do cache ou busca na rede se necessário
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((response) => {
      return response || fetch(event.request);
    })
  );
});

// Ativa o novo Service Worker e limpa caches antigos se houver
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.filter((name) => name !== CACHE_NAME).map((name) => caches.delete(name))
      );
    })
  );
});
