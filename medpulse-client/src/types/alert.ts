export type AlertRecord = {
  id: number
  caseId: number
  severity: string
  message: string
  createdUtc: string
  isAcknowledged: boolean
}
