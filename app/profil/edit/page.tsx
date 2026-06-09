'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import type { SupabaseClient } from '@supabase/supabase-js'

export const dynamic = 'force-dynamic'

export default function EditProfilPage() {
  const router = useRouter()
  const [supabase, setSupabase] = useState<SupabaseClient | null>(null)

  const [prenom, setPrenom] = useState('')
  const [nom, setNom] = useState('')
  const [bio, setBio] = useState('')
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)

  /** 🔐 Initialisation CLIENT-ONLY */
  useEffect(() => {
    const initSupabase = async () => {
      const { supabase } = await import('@/lib/supabaseClient')
      setSupabase(supabase)
    }

    initSupabase()
  }, [])

  /** 📥 Chargement du profil */
  useEffect(() => {
    if (!supabase) return

    const loadProfile = async () => {
      const { data: { user } } = await supabase.auth.getUser()

      if (!user) {
        router.replace('/connexion')
        return
      }

      const { data, error } = await supabase
        .from('profiles')
        .select('prenom, nom, bio')
        .eq('id', user.id)
        .single()

      if (error) {
        setError('Impossible de charger le profil')
      } else if (data) {
        setPrenom(data.prenom ?? '')
        setNom(data.nom ?? '')
        setBio(data.bio ?? '')
      }

      setLoading(false)
    }

    loadProfile()
  }, [supabase, router])

  /** 💾 Sauvegarde */
  const handleSave = async () => {
    if (!supabase) return

    setSaving(true)
    setError(null)

    const { data: { user } } = await supabase.auth.getUser()

    const { error } = await supabase
      .from('profiles')
      .update({
        prenom,
        nom,
        bio,
        updated_at: new Date().toISOString(),
      })
      .eq('id', user?.id)

    setSaving(false)

    if (error) {
      setError("Erreur lors de l'enregistrement")
    } else {
      router.push('/profil')
    }
  }

  if (loading) return <p>Chargement…</p>

  return (
    <div className="max-w-xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Modifier mon profil</h1>

      {error && <p className="text-red-600 mb-4">{error}</p>}

      <div className="space-y-4">
        <input value={prenom} onChange={e => setPrenom(e.target.value)} className="w-full border px-3 py-2" />
        <input value={nom} onChange={e => setNom(e.target.value)} className="w-full border px-3 py-2" />
        <textarea value={bio} onChange={e => setBio(e.target.value)} className="w-full border px-3 py-2" rows={4} />

        <button onClick={handleSave} disabled={saving} className="bg-black text-white px-4 py-2 rounded">
          {saving ? 'Enregistrement…' : 'Enregistrer'}
        </button>
      </div>
    </div>
  )
}