let staticCacheName = 'static-cache-v1'; // Cache version

// Files to cache
const assets = [
    'index.html',
    'restaurant.html',
    './css/styles.css',
    './js/main.js',
    './js/dbhelper.js',
    './js/restaurant_info.js',
    './data/restaurants.json',
    './img/1.webp',
    './img/2.webp',
    './img/3.webp',
    './img/4.webp',
    './img/5.webp',
    './img/6.webp',
    './img/7.webp',
    './img/8.webp',
    './img/9.webp',
    './img/10.webp',
    './favicon.ico',
    './img/restaurant-app.png',
    'https://fonts.googleapis.com/css?family=Playfair+Display:900i|Poppins',
];

//Install
self.addEventListener('install', function (e) {
    e.waitUntil(
        caches.open(staticCacheName).then((cache) => {
            return cache.addAll(assets);
        })
    );
});

//Removes old cache
self.addEventListener('activate', function (event) {
    event.waitUntil(
        caches.keys().then(function (cacheNames) {
            return Promise.all(
                cacheNames.filter(function (cacheName) {
                    return cacheName.startsWith('static-') &&
                        cacheName != staticCacheName;
                }).map(function (cacheName) {
                    return cache.delete(cacheName);
                })
            )
        })
    )
})

// Respond requests
self.addEventListener('fetch', (event) => {
    event.respondWith(
        caches.match(event.request).then((response) => {
            return response || fetch(event.request);
        })
    );
});