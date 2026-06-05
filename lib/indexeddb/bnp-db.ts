// lib/indexeddb/index.ts

export const DB_NAME = 'bnp_library_db'
export const DB_VERSION = 1

export type BNPDatabase = IDBDatabase

export function openBNPDatabase(): Promise<BNPDatabase> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION)

    request.onerror = () => reject(request.error)

    request.onupgradeneeded = () => {
      const db = request.result

      /**
       * 📚 BOOKS
       * Livres BNP (achetés ou gratuits)
       */
      if (!db.objectStoreNames.contains('books')) {
        const store = db.createObjectStore('books', { keyPath: 'id' })
        store.createIndex('by_department', 'department')
        store.createIndex('by_type', 'type') // purchased | free
        store.createIndex('by_updated_at', 'updated_at')
      }

      /**
       * 📄 BOOK FILES
       * Fichiers physiques (PDF / EPUB)
       */
      if (!db.objectStoreNames.contains('book_files')) {
        db.createObjectStore('book_files', { keyPath: 'book_id' })
      }

      /**
       * 📌 RESERVATIONS
       * Livres gratuits réservés
       */
      if (!db.objectStoreNames.contains('reservations')) {
        db.createObjectStore('reservations', { keyPath: 'book_id' })
      }

      /**
       * 💳 PURCHASES
       * Livres achetés
       */
      if (!db.objectStoreNames.contains('purchases')) {
        db.createObjectStore('purchases', { keyPath: 'book_id' })
      }

      /**
       * 🗂️ OFFLINE PAGES
       * Pages accessibles hors ligne
       */
      if (!db.objectStoreNames.contains('offline_pages')) {
        db.createObjectStore('offline_pages', { keyPath: 'path' })
      }

      /**
       * 🔄 SYNC QUEUE
       * Actions en attente de synchronisation
       */
      if (!db.objectStoreNames.contains('sync_queue')) {
        db.createObjectStore('sync_queue', { autoIncrement: true })
      }

      /**
       * 👤 USER
       * Infos utilisateur offline
       */
      if (!db.objectStoreNames.contains('user')) {
        db.createObjectStore('user', { keyPath: 'id' })
      }
    }

    request.onsuccess = () => resolve(request.result)
  })
}