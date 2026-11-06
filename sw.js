/* Service Worker - Boxing Champions */
const V='bc-v1',SHELL=['./','./index.html','./manifest.json','./icons/icon-192.png','./icons/icon-512.png'],
CDN=['https://cdnjs.cloudflare.com/ajax/libs/three.js/r128/three.min.js','https://cdn.jsdelivr.net/npm/three@0.128.0/build/three.min.js','https://fonts.googleapis.com/css2?family=Anton&family=Barlow:wght@500;700&display=swap'];
self.addEventListener('install',e=>{e.waitUntil(caches.open(V).then(async c=>{await c.addAll(SHELL);await Promise.allSettled(CDN.map(u=>fetch(u,{mode:'no-cors'}).then(r=>c.put(u,r))))}).then(()=>self.skipWaiting()))});
self.addEventListener('activate',e=>{e.waitUntil(caches.keys().then(k=>Promise.all(k.filter(x=>x!==V).map(x=>caches.delete(x)))).then(()=>self.clients.claim()))});
self.addEventListener('fetch',e=>{const q=e.request;if(q.method!=='GET')return;const u=new URL(q.url);
if(q.mode==='navigate'){e.respondWith(fetch(q).then(r=>{const k=r.clone();caches.open(V).then(c=>c.put('./index.html',k));return r}).catch(()=>caches.match('./index.html')));return}
/* mismo origen y CDN: cache primero, y se actualiza en segundo plano */
e.respondWith(caches.match(q).then(h=>{const n=fetch(q).then(r=>{if(r&&(r.ok||r.type==='opaque')){const k=r.clone();caches.open(V).then(c=>c.put(q,k))}return r}).catch(()=>h);return h||n}))});
