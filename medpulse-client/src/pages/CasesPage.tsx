import { useEffect, useState } from 'react'
import { CasesTable } from '../components/CasesTable'
import { api } from '../services/api'
import type { CaseRecord } from '../types/case'

export function CasesPage() {
  const [status, setStatus] = useState('')
  const [cases, setCases] = useState<CaseRecord[]>([])

  useEffect(() => {
    void loadCases()
  }, [status])

  const loadCases = async () => {
    const url = status ? `/cases?status=${status}` : '/cases'
    const { data } = await api.get<CaseRecord[]>(url)
    setCases(data)
  }

  return (
    <main className="mx-auto max-w-7xl p-6">
      <div className="mb-4">
        <label className="mr-2 text-sm text-slate-700">Filter by status:</label>
        <select value={status} onChange={(e) => setStatus(e.target.value)} className="rounded border border-slate-300 p-2 text-sm">
          <option value="">All</option>
          <option value="Stable">Stable</option>
          <option value="Monitoring">Monitoring</option>
          <option value="Critical">Critical</option>
        </select>
      </div>
      <CasesTable cases={cases} />
    </main>
  )
}
