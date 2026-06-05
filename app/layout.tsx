import './globals.css'
import type { Metadata } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'

import Footer from './components/Footer'
import PWARegister from './pwa-register'
import InitIndexedDB from './components/InitIndexedDB'

const geistSans = Geist({
  subsets: ['latin'],
})

const geistMono = Geist_Mono({
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'MPR & CS',
  description:
    'Plateforme officielle du Ministère Pensée Renouvelée & Club des Semeurs',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <head>
        {/* ===== PWA ===== */}
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#0f172a" />
      </head>

      <body
        className={`${geistSans.className} ${geistMono.className} min-h-screen flex flex-col`}
      >
        {/* ===== Initialisations techniques CLIENT ===== */}
        <InitIndexedDB />
        <PWARegister />

        {/* ===== Contenu ===== */}
        <main className="flex-grow">{children}</main>

        {/* ===== Footer global ===== */}
        <Footer />
      </body>
    </html>
  )
}