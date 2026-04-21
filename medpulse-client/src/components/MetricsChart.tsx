import { Line, LineChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import type { MetricPoint } from '../types/dashboard'

type MetricsChartProps = {
  metrics: MetricPoint[]
  title?: string
}

export function MetricsChart({ metrics, title = 'Vital Trends' }: MetricsChartProps) {
  return (
    <section className="rounded-xl bg-white p-4 shadow">
      <h3 className="mb-4 text-lg font-semibold text-slate-800">{title}</h3>
      <div className="h-72">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={metrics.map((m) => ({ ...m, time: new Date(m.timestampUtc).toLocaleTimeString() }))}>
            <XAxis dataKey="time" />
            <YAxis />
            <Tooltip />
            <Line type="monotone" dataKey="heartRate" stroke="#0f766e" name="Heart Rate" strokeWidth={2} dot={false} />
            <Line type="monotone" dataKey="oxygenLevel" stroke="#2563eb" name="Oxygen Level" strokeWidth={2} dot={false} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </section>
  )
}
