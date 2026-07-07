const CACHE_NAME = "biblia-vdc-v1";

const FILES_TO_CACHE = [

    "./",
    "./index.html",
    "./style.css",
    "./manifest.json",

    "./js/app.js",
    "./js/bible.js",
    "./js/ui.js",
    "./js/search.js",
    "./js/storage.js",

    "./data/books.json",
    "./data/bible.json"

];

// Instalare
self.addEventListener("install", (event) => {

    event.waitUntil(

        caches.open(CACHE_NAME).then((cache) => {

            return cache.addAll(FILES_TO_CACHE);

        })

    );

    self.skipWaiting();

});

// Activare
self.addEventListener("activate", (event) => {

    event.waitUntil(

        caches.keys().then((keys) => {

            return Promise.all(

                keys.map((key) => {

                    if (key !== CACHE_NAME) {

                        return caches.delete(key);

                    }

                })

            );

        })

    );

    self.clients.claim();

});

// Interceptează cererile
self.addEventListener("fetch", (event) => {

    event.respondWith(

        caches.match(event.request).then((response) => {

            if (response) {

                return response;

            }

            return fetch(event.request);

        })

    );

});