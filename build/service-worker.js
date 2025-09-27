const CACHE_NAME = "shabinja-cache-v4";
const urlsToCache = [
  "/",
  "./index.html",
  "./manifest.json",
  "./favicon.ico",
  "./android-chrome-192x192.png",
  "./android-chrome-512x512.png",
  "./offline.html"
  // میتونی مسیر اسکرین‌شات‌ها و فایل‌های استاتیک دیگه هم اضافه کنی
];

self.addEventListener("install", (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(urlsToCache))
  );
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys.filter((key) => key !== CACHE_NAME).map((key) => caches.delete(key))
      )
    )
  );
});

self.addEventListener("fetch", (event) => {
  event.respondWith(
    caches.match(event.request).then((resp) => {
      return resp || fetch(event.request).catch(() => caches.match("/offline.html"));
    })
  );
});
