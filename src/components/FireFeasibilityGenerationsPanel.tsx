import type { FireFeasibilityGenerationMetrics } from '../domain/fireFeasibility.types'

interface FireFeasibilityGenerationsPanelProps {
  generationA: FireFeasibilityGenerationMetrics
  generationB: FireFeasibilityGenerationMetrics
}

const METRIC_ROWS: { key: keyof FireFeasibilityGenerationMetrics; label: string }[] = [
  { key: 'L', label: 'L' },
  { key: 'LPlus', label: 'L+' },
  { key: 'Low', label: 'Low' },
  { key: 'F', label: 'F' },
]

function formatPercent(value: number): string {
  return `${value}%`
}

function GenerationColumn({
  title,
  metrics,
}: {
  title: string
  metrics: FireFeasibilityGenerationMetrics
}) {
  return (
    <div className="flex flex-col gap-3 text-center">
      <h4 className="text-sm font-bold text-neutral-800">{title}</h4>
      <div className="flex flex-col gap-2">
        {METRIC_ROWS.map((row) => (
          <div key={row.key} className="text-sm font-semibold tabular-nums text-neutral-800">
            {row.label}: {formatPercent(metrics[row.key])}
          </div>
        ))}
      </div>
    </div>
  )
}

function FireFeasibilityGenerationsPanel({
  generationA,
  generationB,
}: FireFeasibilityGenerationsPanelProps) {
  return (
    <section className="grid grid-cols-2 gap-4 rounded-xl border border-neutral-200 bg-white px-4 py-4">
      <GenerationColumn title="דור א׳" metrics={generationA} />
      <GenerationColumn title="דור ב׳" metrics={generationB} />
    </section>
  )
}

export default FireFeasibilityGenerationsPanel
