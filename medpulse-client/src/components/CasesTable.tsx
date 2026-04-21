import { Link } from 'react-router-dom'
import type { CaseRecord } from '../types/case'

type CasesTableProps = {
  cases: CaseRecord[]
}

export function CasesTable({ cases }: CasesTableProps) {
  return (
    <section className="rounded-xl bg-white p-4 shadow">
      <h3 className="mb-4 text-lg font-semibold text-slate-800">Cases</h3>
      <table className="w-full text-left text-sm">
        <thead className="text-slate-500">
          <tr>
            <th className="pb-2">Patient</th>
            <th className="pb-2">Device</th>
            <th className="pb-2">Status</th>
            <th className="pb-2">Heart</th>
            <th className="pb-2">Oxygen</th>
            <th className="pb-2"></th>
          </tr>
        </thead>
        <tbody>
          {cases.map((item) => (
            <tr key={item.id} className="border-t border-slate-200">
              <td className="py-2">{item.patientName}</td>
              <td className="py-2">{item.deviceId}</td>
              <td className="py-2">{item.status}</td>
              <td className="py-2">{item.heartRate}</td>
              <td className="py-2">{item.oxygenLevel}%</td>
              <td className="py-2">
                <Link to={`/cases/${item.id}`} className="text-cyan-700 hover:underline">Details</Link>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  )
}
