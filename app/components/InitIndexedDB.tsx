'use client'

import { useEffect } from 'react'
import { openBNPDatabase } from '@/lib/indexeddb/bnp-db'

export default function InitIndexedDB() {
  useEffect(() => {
    let mounted = true

    openBNPDatabase()
      .then((db) => {
        if (!mounted) return
        console.log('✅ IndexedDB BNP prête :', db.name)
        db.close()
      })
      .catch((err) => {
        console.error(
          '❌ Erreur initialisation IndexedDB :',
          err
        )
      })

    return () => {
      mounted = false
    }
  }, [])

  return null
}