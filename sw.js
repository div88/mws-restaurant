import { error } from "util";

var CACHE_NAME = 'mws-restaurant-cache-v1';
var urlsToCache = [
  '/',
  '/css/restaurant.css',
  '/css/styles.css',
  '/js/main.js',
  '/js/restaurant_info.js',
  '/js/dbhelper.js',
  '/img/restaurant1.jpg',
  '/img/restaurant2.jpg',
  '/img/restaurant3.jpg',
  '/img/restaurant4.jpg',
  '/img/restaurant5.jpg',
  '/img/restaurant6.jpg',
  '/img/restaurant7.jpg',
  '/img/restaurant8.jpg',
  '/img/restaurant9.jpg',
  '/img/restaurant10.jpg',

];

self.addEventListener('install', function(event) {
  // Perform install steps
  event.waitUntil(
    caches.open(CACHE_NAME)
      .then(function(cache) {
        console.log('Opened cache');
        return cache.addAll(urlsToCache);
      })
  );
});

self.addEventListener('fetch', function(event) {
    event.respondWith(
      caches.match(event.request)
        .then(function(response) {
          // Cache hit - return response
          if (response) {
            return response;
          }
          return fetch(event.request);
        }).catch(error => {
            return new Response('Not connected to the internet', {
                status :404,
                statusText: "Not connected to the internet"
            });
        })
    );
  });

// self.addEventListener('activate', function(event) {

//     var cacheWhitelist = ['mws-restaurant-cache-v1'];
  
//     event.waitUntil(
//       caches.keys().then(function(cacheNames) {
//         return Promise.all(
//           cacheNames.map(function(cacheName) {
//             if (cacheWhitelist.indexOf(cacheName) === -1) {
//               return caches.delete(cacheName);
//             }
//           })
//         );
//       })
//     );

    
//   });

  self.addEventListener('activate', event => {
    event.waitUntil(clients.claim());
  });