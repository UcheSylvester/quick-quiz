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
