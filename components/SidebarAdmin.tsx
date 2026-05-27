'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabaseClient'

const menus = [
  { label: 'Dashboard', href: '/departements/dodv/dashboard' },
  { label: 'Membres', href: '/departements/dodv/membres' },
  { label: 'Statistiques', href: '/departements/dodv/statistiques' },
  { label: 'Mon profil', href: '/profil' },
]

export default function SidebarAdmin() {
  const pathname = usePathname()
  const router = useRouter()

  const logout = async () => {
    await supabase.auth.signOut()
    router.replace('/connexion')
  }

  return (
    <aside className="w-64 min-h-screen bg-gray-900 text-white flex flex-col">
      <div className="px-6 py-5 text-xl font-bold border-b border-gray-700">
        DODV – Admin
      </div>

      <nav className="flex-1 px-4 py-4 space-y-1">
        {menus.map((menu) => {
          const active = pathname === menu.href

          return (
            <Link
              key={menu.href}
              href={menu.href}
              className={`block rounded px-3 py-2 text-sm transition ${
                active
                  ? 'bg-gray-700 font-semibold'
                  : 'hover:bg-gray-800'
              }`}
            >
              {menu.label}
            </Link>
          )
        })}
      </nav>

      <div className="p-4 border-t border-gray-700">
        <button
          onClick={logout}
          className="w-full text-sm bg-red-600 hover:bg-red-700 px-3 py-2 rounded"
        >
          Déconnexion
        </button>
      </div>
    </aside>
  )
}