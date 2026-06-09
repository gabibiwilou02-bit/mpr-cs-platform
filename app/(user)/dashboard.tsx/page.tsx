"use client";

export const dynamic = "force-dynamic";

import { useEffect, useState } from "react";
import {
  getOfflineBooks,
  openOfflineBook,
} from "@/lib/indexeddb/bnp-actions";
import type { BNPBook } from "@/lib/indexeddb/bnp-actions";

export default function UserDashboardPage() {
  const [offline, setOffline] = useState(false);
  const [books, setBooks] = useState<BNPBook[]>([]);

  /* ===========================
     ONLINE / OFFLINE STATUS
  ============================ */
  useEffect(() => {
    const updateStatus = () => {
      setOffline(!navigator.onLine);
    };

    updateStatus();

    window.addEventListener("online", updateStatus);
    window.addEventListener("offline", updateStatus);

    return () => {
      window.removeEventListener("online", updateStatus);
      window.removeEventListener("offline", updateStatus);
    };
  }, []);

  /* ===========================
     CHARGEMENT DES LIVRES OFFLINE
  ============================ */
  useEffect(() => {
    let cancelled = false;

    (async () => {
      try {
        const data = await getOfflineBooks();
        if (!cancelled) {
          setBooks(data);
        }
      } catch (e) {
        console.error("Erreur chargement livres offline", e);
      }
    })();

    return () => {
      cancelled = true;
    };
  }, []);

  /* ===========================
     UI
  ============================ */
  return (
    <section className="p-6 space-y-4">
      <h1 className="text-xl font-bold">Espace personnel</h1>

      {offline && (
        <p className="text-sm text-orange-600">
          Mode hors ligne activé
        </p>
      )}

      {books.length === 0 ? (
        <p className="text-gray-500">
          Aucun livre disponible hors ligne
        </p>
      ) : (
        <ul className="space-y-3">
          {books.map((book) => (
            <li
              key={book.id}
              className="border rounded p-3 space-y-1"
            >
              <strong>{book.title}</strong>

              <div className="text-sm text-gray-600">
                {book.author}
              </div>

              <div className="text-xs text-gray-500">
                {book.type === "purchased"
                  ? "Accès permanent"
                  : "Livre gratuit réservé"}
              </div>

              <button
                className="text-sm text-blue-600 underline"
                onClick={async () => {
                  try {
                    const url = await openOfflineBook(book.id);
                    window.open(url, "_blank", "noopener");
                  } catch (e) {
                    console.error("Erreur dashboard:", e);
                    alert(
                      "Impossible d’ouvrir le livre hors ligne"
                    );
                  }
                }}
              >
                Lire hors ligne
              </button>
            </li>
          ))}
        </ul>
      )}
    </section>
  );
}