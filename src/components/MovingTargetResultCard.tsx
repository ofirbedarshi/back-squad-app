interface ResultRow {
  label: string
  value: string | null
  unit: string
  highlight?: boolean
  warning?: boolean
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
              className={[
                'flex flex-col items-center gap-1 rounded-xl px-2 py-3 border',
                row.warning
                  ? 'bg-red-50 border-red-200'
                  : 'bg-neutral-50 border-neutral-100',
              ].join(' ')}
            >
              <span
                className={[
                  'text-xs text-center leading-tight',
                  row.warning ? 'text-red-600' : 'text-neutral-500',
                ].join(' ')}
              >
                {row.label}
              </span>
              <span
                className={[
                  'text-lg font-bold tabular-nums leading-tight',
                  row.value === null
                    ? 'text-neutral-300'
                    : row.warning
                      ? 'text-red-700'
                      : row.highlight
                        ? 'text-blue-600'
                        : 'text-neutral-800',
                ].join(' ')}
              >
                {row.value !== null ? row.value : '—'}
              </span>
              {row.value !== null && (
                <span
                  className={[
                    'text-xs font-medium',
                    row.warning ? 'text-red-500' : 'text-neutral-400',
                  ].join(' ')}
                >
                  {row.unit}
                </span>
              )}
            </div>
          ))}
        </div>
      ) : (
        <div className="divide-y divide-neutral-100">
          {rows.map((row) => (
            <div
              key={row.label}
              className={[
                'flex items-center justify-between px-4 py-3.5',
                row.warning ? 'bg-red-50' : '',
              ].join(' ')}
            >
              <span className={['text-sm', row.warning ? 'text-red-600' : 'text-neutral-600'].join(' ')}>
                {row.label}
              </span>
              <span
                className={[
                  'text-base font-semibold tabular-nums',
                  row.value === null
                    ? 'text-neutral-300'
                    : row.warning
                      ? 'text-red-700'
                      : row.highlight
                        ? 'text-blue-600'
                        : 'text-neutral-800',
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
