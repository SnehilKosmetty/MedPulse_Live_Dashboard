import { useEffect, useState } from 'react'
import { AlertsPanel } from '../components/AlertsPanel'
import { CasesTable } from '../components/CasesTable'
import { MetricsChart } from '../components/MetricsChart'
import { SummaryCard } from '../components/SummaryCard'
import { api } from '../services/api'
import { startMetricStream, stopMetricStream } from '../services/signalr'
import type { AlertRecord } from '../types/alert'
import type { CaseRecord } from '../types/case'
import type { DashboardSummary, MetricPoint } from '../types/dashboard'

export function DashboardPage() {
  const [summary, setSummary] = useState<DashboardSummary>()
  const [alerts, setAlerts] = useState<AlertRecord[]>([])
  const [cases, setCases] = useState<CaseRecord[]>([])
  const [metrics, setMetrics] = useState<MetricPoint[]>([])
  const [ackId, setAckId] = useState<number | null>(null)

  useEffect(() => {
    void loadData()
    void startMetricStream((metric) => {
      setMetrics((prev) => [...prev.slice(-29), metric])
    })

    return () => {
      void stopMetricStream()
    }
  }, [])

  const loadData = async () => {
    const [summaryRes, alertsRes, casesRes, metricsRes] = await Promise.all([
      api.get<DashboardSummary>('/dashboard/summary'),
      api.get<AlertRecord[]>('/alerts'),
      api.get<CaseRecord[]>('/cases'),
      api.get<MetricPoint[]>('/dashboard/metrics?count=20'),
    ])

    setSummary(summaryRes.data)
    setAlerts(alertsRes.data)
    setCases(casesRes.data)
    setMetrics(metricsRes.data)
  }

  const handleAcknowledge = async (id: number) => {
    setAckId(id)
    try {
      await api.post(`/alerts/${id}/acknowledge`)
      const [summaryRes, alertsRes] = await Promise.all([
        api.get<DashboardSummary>('/dashboard/summary'),
        api.get<AlertRecord[]>('/alerts'),
      ])
      setSummary(summaryRes.data)
      setAlerts(alertsRes.data)
    } finally {
      setAckId(null)
    }
  }

  return (
    <main className="mx-auto max-w-7xl space-y-6 p-6">
      <section className="grid grid-cols-1 gap-4 md:grid-cols-4">
        <SummaryCard label="Active Cases" value={summary?.activeCases ?? '-'} />
        <SummaryCard label="Critical Alerts" value={summary?.criticalAlerts ?? '-'} />
        <SummaryCard label="Average Heart Rate" value={summary?.avgHeartRate ?? '-'} />
        <SummaryCard label="Average Oxygen" value={summary?.avgOxygenLevel ?? '-'} />
      </section>

      <section className="grid grid-cols-1 gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <MetricsChart metrics={metrics} />
        </div>
        <AlertsPanel
          alerts={alerts}
          onAcknowledge={handleAcknowledge}
          acknowledgingId={ackId}
        />
      </section>

      <CasesTable cases={cases.slice(0, 5)} />
    </main>
  )
}
