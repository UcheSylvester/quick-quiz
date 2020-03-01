const cacheName = "quick-quiz-v1";

const assets = [
  "/",
  "/index.html",
  "/css/app.css",
  "/css/end.css",
  "/css/game.css",
  "/css/highscores.css",
  "/images/facebook.png",
  "/images/icon.png",
  "/images/twitter.png",
  "/js/end.js",
  "/js/game.js",
  "/js/highscores.js",
  "/pages/end.html",
  "/pages/game.html",
  "/pages/highscores.html"
];

self.addEventListener("install", installEvent => {
  installEvent.waitUntil(
    caches
      .open(cacheName)
      .then(cache => cache.addAll(assets))
      .catch(err => console.log(err))
  );
});

self.addEventListener("fetch", fetchEvent => {
  const { request } = fetchEvent;
  console.log(request.url);

  fetchEvent.respondWith(
    caches
      .match(request)
      .then(response => {
        // return response || fetch(fetchEvent.request);
        if (response) {
          return response;
        }

        // return fetch(request);

        if (!request.url.includes("https://opentdb.com/api.php?")) {
          return fetch(request);
        } else {
          return fetch(fetchEvent.request).then(response => {
            console.log(response);
            console.log(response?.url, "res");

            return caches
              .open(cacheName)
              .then(cache => {
                cache.put(request.url, response.clone());
                return response;
              })
              .catch(console.log);
          });
        }
      })
      .catch(err => console.log(err))
  );
});
