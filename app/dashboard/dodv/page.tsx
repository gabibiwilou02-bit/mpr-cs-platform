'use client'

import { useEffect, useState } from 'react'
import { supabase } from '@/lib/supabaseClient'

type Resume = {
  name: string
  type: string
  currency: string
  total: number
}

export default function DODVDashboard() {
  const [data, setData] = useState<Resume[]>([])

  useEffect(() => {
    supabase
      .rpc('dodv_totaux_par_cible')
      .then(({ data }) => setData(data || []))
  }, [])

  return (
    <section className="p-6 space-y-6">
      <h1 className="text-2xl font-bold text-blue-700">
        Tableau financier DODV
      </h1>

      <table className="w-full border">
        <thead className="bg-gray-100">
          <tr>
            <th className="p-2">Cible</th>
            <th>Type</th>
            <th>Devise</th>
            <th>Total</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row, i) => (
            <tr key={i} className="border-t">
              <td className="p-2">{row.name}</td>
              <td>{row.type}</td>
              <td>{row.currency}</td>
              <td className="font-semibold">
                {row.total.toLocaleString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  )
}