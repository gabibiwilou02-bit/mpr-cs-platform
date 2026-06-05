'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabaseClient'
import { openBNPDatabase } from '@/app/lib/indexeddb/bnp'

type Profile = {
  id: string
  email: string | null
  prenom: string | null
  nom: string | null
  bio: string | null
  avatar_url: string | null
}

export default function DashboardProfilPage() {
  const router = useRouter()

  const [profile, setProfile] = useState<Profile | null>(null)
  const [loading, setLoading] = useState(true)
  const [uploading, setUploading] = useState(false)
  const [saving, setSaving] = useState(false)

  const [prenom, setPrenom] = useState('')
  const [nom, setNom] = useState('')
  const [bio, setBio] = useState('')

  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)

  /* =========================
   ✅ TEST BNP IndexedDB (UNE FOIS)
   ========================= */
useEffect(() => {
  openBNPDatabase()
    .then(() => {
      console.log('📚 bnp_library IndexedDB créée avec succès')
    })
    .catch((err) => {
      console.error('❌ Erreur IndexedDB BNP', err)
    })
}, [])

  /* =========================
     Chargement du profil
     ========================= */
  useEffect(() => {
    const loadProfile = async () => {
      const { data: auth } = await supabase.auth.getUser()

      if (!auth.user) {
        router.replace('/connexion')
        return
      }

      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', auth.user.id)
        .single()

      if (error || !data) {
        setError('Impossible de charger le profil')
      } else {
        setProfile(data)
        setPrenom(data.prenom ?? '')
        setNom(data.nom ?? '')
        setBio(data.bio ?? '')
      }

      setLoading(false)
    }

    loadProfile()
  }, [router])

  /* =========================
     Upload avatar
     ========================= */
  const uploadAvatar = async (file: File) => {
    if (!profile) return

    try {
      setUploading(true)
      setError(null)

      const fileExt = file.name.split('.').pop() || 'png'
      const filePath = `${profile.id}/avatar.${fileExt}`

      const { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(filePath, file, {
          upsert: true,
          contentType: file.type,
        })

      if (uploadError) throw uploadError

      const { data } = supabase.storage
        .from('avatars')
        .getPublicUrl(filePath)

      const { error: updateError } = await supabase
        .from('profiles')
        .update({ avatar_url: data.publicUrl })
        .eq('id', profile.id)

      if (updateError) throw updateError

      setProfile({ ...profile, avatar_url: data.publicUrl })
    } catch (err) {
      console.error(err)
      setError('Erreur lors de l’upload de l’avatar')
    } finally {
      setUploading(false)
    }
  }

  /* =========================
     Sauvegarde infos
     ========================= */
  const saveProfile = async () => {
    if (!profile) return

    try {
      setSaving(true)
      setError(null)
      setSuccess(null)

      const { error } = await supabase
        .from('profiles')
        .update({ prenom, nom, bio })
        .eq('id', profile.id)

      if (error) throw error

      setProfile({ ...profile, prenom, nom, bio })
      setSuccess('Profil mis à jour avec succès')
    } catch (err) {
      console.error(err)
      setError('Erreur lors de la sauvegarde')
    } finally {
      setSaving(false)
    }
  }

  const logout = async () => {
    await supabase.auth.signOut()
    router.replace('/connexion')
  }

  if (loading) return <p className="p-6">Chargement...</p>
  if (error) return <p className="p-6 text-red-600">{error}</p>
  if (!profile) return null

  return (
    <div className="max-w-xl mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-bold">Mon profil</h1>

      {/* Avatar */}
      <div className="flex items-center gap-4">
        <div className="relative w-24 h-24 rounded-full overflow-hidden bg-gray-200">
          <Image
            src={profile.avatar_url || '/avatar-placeholder.png'}
            alt="Avatar"
            fill
            className="object-cover"
          />
        </div>

        <label className="text-sm cursor-pointer text-blue-600 underline">
          {uploading ? 'Upload...' : 'Changer avatar'}
          <input
            type="file"
            accept="image/*"
            hidden
            onChange={(e) => {
              const file = e.target.files?.[0]
              if (file) uploadAvatar(file)
            }}
          />
        </label>
      </div>

      {/* Infos */}
      <div className="space-y-3">
        <input
          value={prenom}
          onChange={(e) => setPrenom(e.target.value)}
          placeholder="Prénom"
          className="w-full border rounded px-3 py-2"
        />
        <input
          value={nom}
          onChange={(e) => setNom(e.target.value)}
          placeholder="Nom"
          className="w-full border rounded px-3 py-2"
        />
        <textarea
          value={bio}
          onChange={(e) => setBio(e.target.value)}
          rows={3}
          placeholder="Bio"
          className="w-full border rounded px-3 py-2"
        />

        <button
          onClick={saveProfile}
          disabled={saving}
          className="px-4 py-2 bg-blue-600 text-white rounded"
        >
          {saving ? 'Enregistrement...' : 'Enregistrer'}
        </button>

        {success && <p className="text-green-600 text-sm">{success}</p>}
      </div>

      <button
        onClick={logout}
        className="px-4 py-2 bg-gray-800 text-white rounded"
      >
        Déconnexion
      </button>
    </div>
  )
}