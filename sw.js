self.addEventListener('install', (event) => {
  console.log('P&O Service Worker instalado');
});

self.addEventListener('fetch', (event) => {
  // Necessário para que o navegador permita a instalação
});
