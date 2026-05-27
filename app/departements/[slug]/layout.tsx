// app/departements/[slug]/layout.tsx
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { createServerClient } from '@supabase/ssr'

export default async function DepartementLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: { slug: string }
}) {
  const cookieStore = await cookies() // ✅ OBLIGATOIRE

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        get(name: string) {
          return cookieStore.get(name)?.value
        },
      },
    }
  )

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect('/connexion')
  }

  // 🔍 Récupération du rôle et du département
  const { data: profile } = await supabase
    .from('profiles')
    .select('role, departement_slug')
    .eq('id', user.id)
    .single()

  if (!profile) {
    redirect('/acces-refuse')
  }

  const { role, departement_slug } = profile

  /**
   * RÈGLES :
   * - admin : accès total
   * - comité : accès à TOUS les départements (lecture)
   * - membre : uniquement SON département
   * - utilisateur : accès refusé
   */

  if (role === 'utilisateur') {
    redirect('/acces-refuse')
  }

  if (role === 'membre' && departement_slug !== params.slug) {
    redirect('/acces-refuse')
  }

  // comité & admin passent
  return <>{children}</>
}