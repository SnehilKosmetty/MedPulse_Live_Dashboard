type SummaryCardProps = {
  label: string
  value: string | number
}

export function SummaryCard({ label, value }: SummaryCardProps) {
  return (
    <article className="rounded-xl bg-white p-4 shadow">
      <p className="text-sm text-slate-500">{label}</p>
      <p className="mt-1 text-2xl font-bold text-slate-800">{value}</p>
    </article>
  )
}
