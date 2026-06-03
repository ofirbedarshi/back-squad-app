interface ResultRow {
  label: string
  value: string | null
  unit: string
  highlight?: boolean
}

interface MovingTargetResultCardProps {
  rows: ResultRow[]
  title: string
  layout?: 'list' | 'grid'
}

function MovingTargetResultCard({ rows, title, layout = 'list' }: MovingTargetResultCardProps) {
  return (
    <section className="bg-white rounded-2xl border border-neutral-200 shadow-sm overflow-hidden">
      <h3 className="text-sm font-semibold text-neutral-500 uppercase tracking-wide px-4 py-3 border-b border-neutral-100 bg-neutral-50">
        {title}
      </h3>

      {layout === 'grid' ? (
        <div className="grid p-3 gap-2" style={{ gridTemplateColumns: `repeat(${rows.length}, 1fr)` }}>
          {rows.map((row) => (
            <div
              key={row.label}
              className="flex flex-col items-center gap-1 bg-neutral-50 rounded-xl px-2 py-3 border border-neutral-100"
            >
              <span className="text-xs text-neutral-500 text-center leading-tight">{row.label}</span>
              <span
                className={[
                  'text-lg font-bold tabular-nums leading-tight',
                  row.highlight ? 'text-blue-600' : 'text-neutral-800',
                  row.value === null ? 'text-neutral-300' : '',
                ].join(' ')}
              >
                {row.value !== null ? row.value : '—'}
              </span>
              {row.value !== null && (
                <span className="text-xs font-medium text-neutral-400">{row.unit}</span>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="divide-y divide-neutral-100">
          {rows.map((row) => (
            <div key={row.label} className="flex items-center justify-between px-4 py-3.5">
              <span className="text-sm text-neutral-600">{row.label}</span>
              <span
                className={[
                  'text-base font-semibold tabular-nums',
                  row.highlight ? 'text-blue-600' : 'text-neutral-800',
                  row.value === null ? 'text-neutral-300' : '',
                ].join(' ')}
              >
                {row.value !== null
                  ? row.unit
                    ? `${row.value} ${row.unit}`
                    : row.value
                  : '—'}
              </span>
            </div>
          ))}
        </div>
      )}
    </section>
  )
}

export default MovingTargetResultCard
