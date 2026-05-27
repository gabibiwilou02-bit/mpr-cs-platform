'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { supabase } from '@/lib/supabaseClient'

type Profile = {
  id: string
  email: string | null
  prenom: string | null
  nom: string | null
  role: string | null
  bio: string | null
  avatar_url: string | null
}

export default function ProfilPage() {
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

  useEffect(() => {
    const loadProfile = async () => {
      const {
        data: { user },
      } = await supabase.auth.getUser()

      if (!user) {
        router.replace('/connexion')
        return
      }

      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
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

  const uploadAvatar = async (file: File) => {
    if (!profile) return

    try {
      setUploading(true)
      setError(null)

      const fileExt = file.name.split('.').pop()
      const filePath = `${profile.id}.${fileExt}`

      const { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(filePath, file, { upsert: true })

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
    } catch {
      setError('Erreur lors de l’upload de l’avatar')
    } finally {
      setUploading(false)
    }
  }

  const saveProfile = async () => {
    if (!profile) return

    try {
      setSaving(true)
      setError(null)
      setSuccess(null)

      const { error } = await supabase
        .from('profiles')
        .update({
          prenom,
          nom,
          bio,
        })
        .eq('id', profile.id)

      if (error) throw error

      setProfile({ ...profile, prenom, nom, bio })
      setSuccess('Profil mis à jour avec succès')
    } catch {
      setError('Erreur lors de la sauvegarde du profil')
    } finally {
      setSaving(false)
    }
  }

  const logout = async () => {
    await supabase.auth.signOut()
    router.replace('/connexion')
  }

  const deleteAccount = async () => {
    const confirmDelete = window.confirm(
      'Cette action est irréversible. Supprimer votre compte ?'
    )
    if (!confirmDelete || !profile) return

    await supabase.from('profiles').delete().eq('id', profile.id)
    await supabase.auth.signOut()
    router.replace('/')
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
            sizes="96px"
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

      {/* Infos éditables */}
      <div className="space-y-3">
        <div>
          <label className="text-sm font-medium">Prénom</label>
          <input
            value={prenom}
            onChange={(e) => setPrenom(e.target.value)}
            className="w-full border rounded px-3 py-2"
          />
        </div>

        <div>
          <label className="text-sm font-medium">Nom</label>
          <input
            value={nom}
            onChange={(e) => setNom(e.target.value)}
            className="w-full border rounded px-3 py-2"
          />
        </div>

        <div>
          <label className="text-sm font-medium">Bio</label>
          <textarea
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            rows={3}
            className="w-full border rounded px-3 py-2"
          />
        </div>

        <button
          onClick={saveProfile}
          disabled={saving}
          className="px-4 py-2 bg-blue-600 text-white rounded disabled:opacity-50"
        >
          {saving ? 'Enregistrement...' : 'Enregistrer le profil'}
        </button>

        {success && <p className="text-green-600 text-sm">{success}</p>}
      </div>

      {/* Actions */}
      <div className="flex gap-3 pt-4">
        <button
          onClick={logout}
          className="px-4 py-2 bg-gray-800 text-white rounded"
        >
          Déconnexion
        </button>

        <button
          onClick={deleteAccount}
          className="px-4 py-2 bg-red-600 text-white rounded"
        >
          Supprimer mon compte
        </button>
      </div>
    </div>
  )
}