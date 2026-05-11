interface HitPenetrationResultRow {
  label: string
  value: string | null
  unit: string
  highlight?: boolean
}

interface HitPenetrationResultCardProps {
  title: string
  rows: HitPenetrationResultRow[]
}

function HitPenetrationResultCard({ title, rows }: HitPenetrationResultCardProps) {
  return (
    <section className="bg-white rounded-2xl border border-neutral-200 shadow-sm overflow-hidden">
      <h3 className="text-sm font-semibold text-neutral-500 uppercase tracking-wide px-4 py-3 border-b border-neutral-100 bg-neutral-50">
        {title}
      </h3>

      <div className="divide-y divide-neutral-100">
        {rows.map((row) => (
          <div key={row.label} className="flex items-center justify-between gap-3 px-4 py-3.5">
            <span className="text-sm text-neutral-600 leading-tight">{row.label}</span>
            <span
              className={[
                'text-base font-semibold tabular-nums whitespace-nowrap',
                row.highlight ? 'text-blue-600' : 'text-neutral-800',
                row.value === null ? 'text-neutral-300' : '',
              ].join(' ')}
            >
              {row.value !== null ? `${row.value}${row.unit ? ` ${row.unit}` : ''}` : '—'}
            </span>
          </div>
        ))}
      </div>
    </section>
  )
}

export default HitPenetrationResultCard
