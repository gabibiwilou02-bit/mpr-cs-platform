"use client";

import dynamic from "next/dynamic";
import Link from "next/link";

const NotificationBell = dynamic(
  () => import("@/components/NotificationBell"),
  { ssr: false }
);

export default function UserLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="flex justify-between items-center px-6 py-4 bg-white shadow">
        <Link href="/mes-demandes" className="font-bold text-lg">
          Mon espace
        </Link>

        <div className="flex items-center gap-4">
          <NotificationBell />
        </div>
      </header>

      <main className="p-6">{children}</main>
    </div>
  );
}