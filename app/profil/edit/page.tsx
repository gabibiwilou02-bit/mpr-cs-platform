'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabaseClient'

export default function EditProfilPage() {
  const router = useRouter()

  const [prenom, setPrenom] = useState('')
  const [nom, setNom] = useState('')
  const [bio, setBio] = useState('')
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
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
  }, [router])

  const handleSave = async () => {
    setSaving(true)
    setError(null)

    const { error } = await supabase
      .from('profiles')
      .update({
        prenom,
        nom,
        bio,
        updated_at: new Date().toISOString(),
      })
      .eq('id', (await supabase.auth.getUser()).data.user?.id)

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
        <div>
          <label className="block text-sm font-medium">Prénom</label>
          <input
            value={prenom}
            onChange={(e) => setPrenom(e.target.value)}
            className="w-full border rounded px-3 py-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Nom</label>
          <input
            value={nom}
            onChange={(e) => setNom(e.target.value)}
            className="w-full border rounded px-3 py-2"
          />
        </div>

        <div>
          <label className="block text-sm font-medium">Bio</label>
          <textarea
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            className="w-full border rounded px-3 py-2"
            rows={4}
          />
        </div>

        <button
          onClick={handleSave}
          disabled={saving}
          className="bg-black text-white px-4 py-2 rounded"
        >
          {saving ? 'Enregistrement…' : 'Enregistrer'}
        </button>
      </div>
    </div>
  )
}