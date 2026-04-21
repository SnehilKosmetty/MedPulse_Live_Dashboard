export type DashboardSummary = {
  activeCases: number
  criticalAlerts: number
  avgHeartRate: number
  avgOxygenLevel: number
}

export type MetricPoint = {
  timestampUtc: string
  heartRate: number
  oxygenLevel: number
}
