/* eslint-disable no-restricted-globals */

// Nombre del caché y lista de URLs a cachear
const CACHE_NAME = 'my-cache-v1';
const URLsToCache = [
  '/', // Página principal
  '/index.html', 
  '/main.382215a7.js', // Archivos esenciales
  '/static/js/bundle.js',
  '/static/css/main.css', // Asegúrate de que esta sea la ruta correcta al CSS
  '/offline.html', // Página de "offline" para cuando no haya conexión
  // Agrega otros recursos esenciales aquí
];

// Instalar el Service Worker y cachear los archivos
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => {
      console.log('[Service Worker] Caching essential files');
      return cache.addAll(URLsToCache);
    })
  );
});

// Activar el Service Worker
self.addEventListener('activate', (event) => {
  const cacheWhitelist = [CACHE_NAME];

  event.waitUntil(
    caches.keys().then((cacheNames) => {
      return Promise.all(
        cacheNames.map((cacheName) => {
          if (!cacheWhitelist.includes(cacheName)) {
            // Eliminar cachés antiguos no necesarios
            console.log('[Service Worker] Deleting old cache', cacheName);
            return caches.delete(cacheName);  // Devolver la promesa de eliminación
          }
          return Promise.resolve(); // Si el caché está en la whitelist, devolver una promesa resuelta
        })
      );
    })
  );
});

// Interceptar las solicitudes de red y devolver las respuestas desde el cache cuando no hay conexión
self.addEventListener('fetch', (event) => {
  event.respondWith(
    caches.match(event.request).then((cachedResponse) => {
      if (cachedResponse) {
        // Si hay una respuesta cacheada, devolverla
        return cachedResponse;
      }

      // Si no hay una respuesta cacheada, hacer la solicitud de red
      return fetch(event.request).catch((error) => {
        // Si hay un error en la red (sin conexión), devolver una respuesta fallback
        console.log('Error fetching resource: ', error);

        // Si es un archivo esencial como el CSS, que debería estar en cache, manejamos específicamente
        if (event.request.url.endsWith('.css')) {
          return caches.match('/static/css/main.css'); // Ruta del CSS en caso de error
        }

        // Para otros recursos, devolver la página offline
        return caches.match('/offline.html');
      });
    })
  );
});
