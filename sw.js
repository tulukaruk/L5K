const CACHE = "l5k-v12";
const ASSETS = ["./", "index.html", "manifest.json", "fonts/brushtip.ttf", "img/app-192.png","img/app-512.png","img/background.webp","img/el-ogien.png","img/el-powietrze.png","img/el-pustka.png","img/el-woda.png","img/el-ziemia.png","img/frame.webp","img/ic-kregi.webp","img/ic-notatki.webp","img/ic-sztuki.webp","img/ic-tatuaze.webp","img/ic-umiejetnosci.webp","img/ic-zalety.webp","img/panel.webp","img/plaque-rany.webp","img/btn-edytuj.webp","img/btn-pd.webp","img/plaque-honor.webp","img/plaque-chwala.webp","img/plaque-skaza.webp","img/ring-ogien.webp","img/ring-powietrze.webp","img/ring-pustka.webp","img/ring-woda.webp","img/ring-ziemia.webp"];
self.addEventListener("install", e => { e.waitUntil(caches.open(CACHE).then(c => c.addAll(ASSETS)).then(() => self.skipWaiting())); });
self.addEventListener("activate", e => { e.waitUntil(caches.keys().then(ks => Promise.all(ks.filter(k => k !== CACHE).map(k => caches.delete(k)))).then(() => self.clients.claim())); });
self.addEventListener("fetch", e => {
  if (e.request.method !== "GET") return;
  e.respondWith(caches.match(e.request).then(r => r || fetch(e.request).then(res => {
    const copy = res.clone(); caches.open(CACHE).then(c => c.put(e.request, copy)).catch(() => {}); return res;
  }).catch(() => r)));
});
