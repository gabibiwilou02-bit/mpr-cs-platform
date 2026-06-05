// app/lib/indexeddb.ts

export const BNP_DB_NAME = 'bnp_db'
export const BNP_DB_VERSION = 1

export function openBNPDB(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(BNP_DB_NAME, BNP_DB_VERSION)

    request.onupgradeneeded = () => {
      const db = request.result

      // 📚 Livres (meta)
      if (!db.objectStoreNames.contains('books')) {
        const store = db.createObjectStore('books', { keyPath: 'id' })
        store.createIndex('type', 'type') // free | paid
        store.createIndex('author_id', 'author_id')
      }

      // 📄 Pages des livres
      if (!db.objectStoreNames.contains('book_pages')) {
        const store = db.createObjectStore('book_pages', {
          keyPath: ['book_id', 'page_number'],
        })
        store.createIndex('book_id', 'book_id')
      }

      // ⏱️ Réservations (7 jours)
      if (!db.objectStoreNames.contains('reservations')) {
        const store = db.createObjectStore('reservations', {
          keyPath: 'book_id',
        })
        store.createIndex('expires_at', 'expires_at')
      }

      // 💰 Achats (illimité)
      if (!db.objectStoreNames.contains('purchases')) {
        const store = db.createObjectStore('purchases', {
          keyPath: 'book_id',
        })
        store.createIndex('purchased_at', 'purchased_at')
      }

      // 🔄 File de synchronisation
      if (!db.objectStoreNames.contains('sync_queue')) {
        db.createObjectStore('sync_queue', {
          autoIncrement: true,
        })
      }
    }

    request.onsuccess = () => resolve(request.result)
    request.onerror = () => reject(request.error)
  })
}