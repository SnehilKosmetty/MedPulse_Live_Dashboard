import { useCallback, useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { MetricsChart } from '../components/MetricsChart'
import { api } from '../services/api'
import { startMetricStream, stopMetricStream } from '../services/signalr'
import type { CaseRecord } from '../types/case'
import type { MetricPoint } from '../types/dashboard'

export function CaseDetailsPage() {
  const { id } = useParams()
  const [record, setRecord] = useState<CaseRecord>()
  const [caseMetrics, setCaseMetrics] = useState<MetricPoint[]>([])
  const [notFound, setNotFound] = useState(false)

  const loadCase = useCallback(async (caseId: number) => {
    try {
      const [{ data: caseData }, { data: points }] = await Promise.all([
        api.get<CaseRecord>(`/cases/${caseId}`),
        api.get<MetricPoint[]>(`/cases/${caseId}/metrics?count=30`),
      ])
      setRecord(caseData)
      setCaseMetrics(points)
      setNotFound(false)
    } catch {
      setNotFound(true)
      setRecord(undefined)
      setCaseMetrics([])
    }
  }, [])

  useEffect(() => {
    if (!id) {
      return
    }
    setRecord(undefined)
    setNotFound(false)
    const caseId = Number(id)
    void loadCase(caseId)
  }, [id, loadCase])

  useEffect(() => {
    if (!id || notFound || !record) {
      return
    }
    const caseId = Number(id)
    if (record.id !== caseId) {
      return
    }
    void startMetricStream(() => {
      void loadCase(caseId)
    })

    return () => {
      void stopMetricStream()
    }
  }, [id, notFound, record, loadCase])

  if (notFound) {
    return <main className="p-6 text-rose-700">Case not found.</main>
  }

  if (!record) {
    return <main className="p-6 text-slate-600">Loading case details...</main>
  }

  return (
    <main className="mx-auto max-w-3xl space-y-6 p-6">
      <article className="rounded-xl bg-white p-6 shadow">
        <div className="mb-4 flex flex-wrap items-baseline justify-between gap-2">
          <h1 className="text-xl font-bold text-slate-900">Case #{record.id}</h1>
          <span className="inline-flex items-center gap-1 rounded-full bg-emerald-100 px-2 py-0.5 text-xs font-semibold text-emerald-800">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-emerald-500" />
            Live vitals
          </span>
        </div>
        <div className="grid grid-cols-1 gap-2 text-sm text-slate-700">
          <p><span className="font-semibold">Patient:</span> {record.patientName}</p>
          <p><span className="font-semibold">Device:</span> {record.deviceId}</p>
          <p><span className="font-semibold">Status:</span> {record.status}</p>
          <p><span className="font-semibold">Heart Rate:</span> {record.heartRate} bpm</p>
          <p><span className="font-semibold">Oxygen Level:</span> {record.oxygenLevel}%</p>
          <p><span className="font-semibold">Last Update:</span> {new Date(record.lastUpdatedUtc).toLocaleString()}</p>
        </div>
      </article>
      {caseMetrics.length > 0 && (
        <MetricsChart metrics={caseMetrics} title="Case vitals (live)" />
      )}
    </main>
  )
}
