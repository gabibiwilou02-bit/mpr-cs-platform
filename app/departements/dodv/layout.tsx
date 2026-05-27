import SidebarAdmin from '@/components/SidebarAdmin'

export default function DODVLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen flex bg-gray-100">
      {/* Contenu principal à gauche */}
      <main className="flex-1 p-6">
        {children}
      </main>

      {/* Sidebar à droite */}
      <SidebarAdmin />
    </div>
  )
}