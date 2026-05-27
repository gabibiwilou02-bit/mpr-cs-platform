"use client";

import NotificationBell from "@/components/NotificationBell"; 
import Link from "next/link";

export default function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* HEADER UTILISATEUR */}
      <header className="flex justify-between items-center px-6 py-4 bg-white shadow">
        <Link href="/mes-demandes" className="font-bold text-lg">
          Mon espace
        </Link>

        <div className="flex items-center gap-4">
          <NotificationBell />
        </div>
      </header>

      {/* CONTENU DES PAGES */}
      <main className="p-6">{children}</main>
    </div>
  );
}