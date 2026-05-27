import "./globals.css";
import Footer from "./components/Footer";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";

const geistSans = Geist({
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "MPR & CS",
  description:
    "Plateforme officielle du Ministère Pensée Renouvelée & Club des Semeurs",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fr">
      <body
        className={`${geistSans.className} ${geistMono.className} min-h-screen flex flex-col`}
      >
        {/* CONTENU DES PAGES (les navbars viennent des layouts enfants) */}
        <main className="flex-grow">
          {children}
        </main>

        {/* FOOTER GLOBAL – visible partout */}
        <Footer />
      </body>
    </html>
  );
}