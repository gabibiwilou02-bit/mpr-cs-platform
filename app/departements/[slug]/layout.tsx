// app/departements/[slug]/layout.tsx
import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { createServerClient } from '@supabase/ssr'
import type { ReactNode } from 'react'

export default async function DepartementLayout({
  children,
  params,
}: {
  children: ReactNode
  params: Promise<{ slug: string }>
}) {
  // ✅ params est une Promise
  const { slug } = await params

  // ✅ cookies() est AUSSI une Promise dans ton environnement
  const cookieStore = await cookies()

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

  const { data: profile } = await supabase
    .from('profiles')
    .select('role, departement_slug')
    .eq('id', user.id)
    .single()

  if (!profile) {
    redirect('/acces-refuse')
  }

  const { role, departement_slug } = profile

  if (role === 'utilisateur') {
    redirect('/acces-refuse')
  }

  if (role === 'membre' && departement_slug !== slug) {
    redirect('/acces-refuse')
  }

  return <>{children}</>
}