import { openBNPDatabase } from '@/lib/indexeddb/bnp-db'

/* ===========================
   TYPES
=========================== */

export type BNPBook = {
  id: string
  title: string
  author: string
  department: string
  type: 'purchased' | 'free'
}

export type Purchase = {
  book_id: string
  purchased_at: number
}

export type Reservation = {
  book_id: string
  expires_at: number
}

type BookFile = {
  book_id: string
  file: Blob
  saved_at: number
}

/* ===========================
   HELPERS
=========================== */

function requestToPromise<T>(
  request: IDBRequest<T>
): Promise<T> {
  return new Promise((resolve, reject) => {
    request.onsuccess = () => resolve(request.result)
    request.onerror = () => reject(request.error)
  })
}

function transactionDone(
  tx: IDBTransaction
): Promise<void> {
  return new Promise((resolve, reject) => {
    tx.oncomplete = () => resolve()
    tx.onerror = () => reject(tx.error)
    tx.onabort = () => reject(tx.error)
  })
}

/* ===========================
   SAUVEGARDER UN LIVRE
=========================== */
export async function saveBook(
  book: BNPBook
): Promise<void> {
  const db = await openBNPDatabase()
  const tx = db.transaction('books', 'readwrite')
  tx.objectStore('books').put(book)
  await transactionDone(tx)
}

/* ===========================
   SAUVEGARDER FICHIER OFFLINE
=========================== */
export async function saveBookFile(
  bookId: string,
  file: Blob
): Promise<void> {
  const db = await openBNPDatabase()
  const tx = db.transaction('book_files', 'readwrite')

  tx.objectStore('book_files').put({
    book_id: bookId,
    file,
    saved_at: Date.now(),
  } satisfies BookFile)

  await transactionDone(tx)
}

/* ===========================
   LECTURE DU FICHIER OFFLINE
=========================== */
export async function openOfflineBook(
  bookId: string
): Promise<string> {
  const db = await openBNPDatabase()
  const tx = db.transaction('book_files', 'readonly')

  const file = await requestToPromise<BookFile | undefined>(
    tx.objectStore('book_files').get(bookId)
  )

  if (!file) {
    throw new Error('Fichier offline introuvable')
  }

  return URL.createObjectURL(file.file)
}

/* ===========================
   LIVRES DISPONIBLES OFFLINE
=========================== */
export async function getOfflineBooks(): Promise<
  BNPBook[]
> {
  const db = await openBNPDatabase()
  const now = Date.now()

  const tx = db.transaction(
    ['books', 'purchases', 'reservations'],
    'readonly'
  )

  const books = await requestToPromise<BNPBook[]>(
    tx.objectStore('books').getAll()
  )

  const purchases = await requestToPromise<Purchase[]>(
    tx.objectStore('purchases').getAll()
  )

  const reservations =
    await requestToPromise<Reservation[]>(
      tx.objectStore('reservations').getAll()
    )

  const allowedBookIds = new Set<string>([
    ...purchases.map((p) => p.book_id),
    ...reservations
      .filter((r) => r.expires_at > now)
      .map((r) => r.book_id),
  ])

  return books.filter((b) =>
    allowedBookIds.has(b.id)
  )
}