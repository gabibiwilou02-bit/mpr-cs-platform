import { cookies } from 'next/headers'
import { redirect } from 'next/navigation'
import { createServerClient } from '@supabase/ssr'

export default async function RedirectPage() {
  const cookieStore = await cookies()

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll: () => cookieStore.getAll(),
        setAll: () => {},
      },
    }
  )

  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/connexion')
  }

  const { data: profile } = await supabase
    .from('profiles')
    .select('role, department_id')
    .eq('id', user.id)
    .single()

  // ✅ Redirection UNIQUEMENT après login
  if (profile?.role === 'admin' && profile?.department_id === 'DODV') {
    redirect('/departements/dodv/dashboard')
  }

  redirect('/profil')
}