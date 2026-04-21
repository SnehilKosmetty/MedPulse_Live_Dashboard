import * as signalR from '@microsoft/signalr'
import type { MetricPoint } from '../types/dashboard'

const apiBase = (import.meta.env.VITE_API_BASE_URL ?? '').replace(/\/$/, '')
const hubPath = '/hubs/metrics'
const metricsHubUrl = apiBase ? `${apiBase}${hubPath}` : hubPath

let connection: signalR.HubConnection | null = null

export async function startMetricStream(onMetric: (metric: MetricPoint) => void) {
  const token = localStorage.getItem('medpulse_token')
  if (!token) {
    return null
  }

  connection = new signalR.HubConnectionBuilder()
    .withUrl(metricsHubUrl, {
      accessTokenFactory: () => token,
    })
    .withAutomaticReconnect()
    .build()

  connection.on('metric-updated', onMetric)
  await connection.start()
  return connection
}

export async function stopMetricStream() {
  if (connection) {
    await connection.stop()
    connection = null
  }
}
