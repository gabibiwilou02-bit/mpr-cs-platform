/* public/sw.js */

const CACHE_NAME = 'mprcs-cache-v3'

const APP_SHELL = [
  '/',
  '/manifest.json',
  '/favicon.ico',
  '/icons/icon-192.png',
  '/icons/icon-512.png',
]

/* =========================
   INSTALL
========================= */
self.addEventListener('install', (event) => {
  event.waitUntil(
    caches.open(CACHE_NAME).then((cache) => cache.addAll(APP_SHELL))
  )
  self.skipWaiting()
})

/* =========================
   ACTIVATE
========================= */
self.addEventListener('activate', (event) => {
  event.waitUntil(
    caches.keys().then((keys) =>
      Promise.all(
        keys.map((key) => {
          if (key !== CACHE_NAME) return caches.delete(key)
        })
      )
    )
  )
  self.clients.claim()
})

/* =========================
   FETCH
========================= */
self.addEventListener('fetch', (event) => {
  const request = event.request
  const url = new URL(request.url)

  // ❌ ignorer non-http
  if (!url.protocol.startsWith('http')) return

  // ❌ ignorer WebSocket / HMR
  if (url.pathname.startsWith('/_next/webpack')) return

  // ❌ ignorer extensions Chrome
  if (url.protocol === 'chrome-extension:') return

  // ❌ ignorer non-GET
  if (request.method !== 'GET') return

  // ✅ 1. ASSETS NEXT.JS → CACHE FIRST
  if (url.pathname.startsWith('/_next/static/')) {
    event.respondWith(
      caches.match(request).then((cached) => {
        if (cached) return cached
        return fetch(request).then((response) => {
          const clone = response.clone()
          caches.open(CACHE_NAME).then((cache) => cache.put(request, clone))
          return response
        })
      })
    )
    return
  }

  // ✅ 2. IMAGES / ICONS → CACHE FIRST
  if (request.destination === 'image') {
    event.respondWith(
      caches.match(request).then((cached) => {
        if (cached) return cached
        return fetch(request).then((response) => {
          const clone = response.clone()
          caches.open(CACHE_NAME).then((cache) => cache.put(request, clone))
          return response
        })
      })
    )
    return
  }

  // ✅ 3. PAGES HTML → NETWORK FIRST + FALLBACK
  event.respondWith(
    fetch(request)
      .then((response) => {
        const clone = response.clone()
        caches.open(CACHE_NAME).then((cache) => cache.put(request, clone))
        return response
      })
      .catch(() => caches.match(request).then((res) => res || caches.match('/')))
  )
}) 