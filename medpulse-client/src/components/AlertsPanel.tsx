import type { AlertRecord } from '../types/alert'

type AlertsPanelProps = {
  alerts: AlertRecord[]
  onAcknowledge?: (id: number) => void
  acknowledgingId?: number | null
}

export function AlertsPanel({ alerts, onAcknowledge, acknowledgingId }: AlertsPanelProps) {
  return (
    <section className="rounded-xl bg-white p-4 shadow">
      <h3 className="mb-4 text-lg font-semibold text-slate-800">Active Alerts</h3>
      <div className="space-y-2">
        {alerts.map((alert) => (
          <div key={alert.id} className="flex flex-col gap-2 rounded border border-slate-200 p-2 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-sm font-semibold text-rose-600">{alert.severity}</p>
              <p className="text-sm text-slate-700">{alert.message}</p>
            </div>
            {onAcknowledge && (
              <button
                type="button"
                onClick={() => onAcknowledge(alert.id)}
                disabled={acknowledgingId === alert.id}
                className="shrink-0 self-start rounded border border-cyan-700 px-2 py-1 text-sm text-cyan-800 hover:bg-cyan-50 disabled:opacity-50"
              >
                {acknowledgingId === alert.id ? 'Saving…' : 'Acknowledge'}
              </button>
            )}
          </div>
        ))}
        {alerts.length === 0 && <p className="text-sm text-slate-500">No active alerts.</p>}
      </div>
    </section>
  )
}
