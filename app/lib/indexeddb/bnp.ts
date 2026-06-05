// app/lib/indexeddb/bnp.ts

const DB_NAME = 'bnp_library'
const DB_VERSION = 1

export const openBNPDatabase = (): Promise<IDBDatabase> => {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION)

    request.onupgradeneeded = () => {
      const db = request.result

      if (!db.objectStoreNames.contains('books')) {
        db.createObjectStore('books', { keyPath: 'id' })
      }

      if (!db.objectStoreNames.contains('reservations')) {
        db.createObjectStore('reservations', { keyPath: 'book_id' })
      }

      if (!db.objectStoreNames.contains('downloads')) {
        db.createObjectStore('downloads', { keyPath: 'book_id' })
      }

      if (!db.objectStoreNames.contains('payments_meta')) {
        db.createObjectStore('payments_meta', { keyPath: 'book_id' })
      }
    }

    request.onsuccess = () => resolve(request.result)
    request.onerror = () => reject(request.error)
  })
}