import type { FireFeasibilityFlightPathResultRow } from '../domain/fireFeasibility.constants'
import type { FireFeasibilityFlightPathPercentByPath } from '../domain/fireFeasibility.types'

interface FireFeasibilityFlightPathResultColumnProps {
  generationLabel: string
  rows: readonly FireFeasibilityFlightPathResultRow[]
  percentByFlightPath: FireFeasibilityFlightPathPercentByPath
}

function FireFeasibilityFlightPathResultColumn({
  generationLabel,
  rows,
  percentByFlightPath,
}: FireFeasibilityFlightPathResultColumnProps) {
  return (
    <div className="flex flex-1 flex-col gap-2">
      <h4 className="text-center text-sm font-bold text-neutral-800 underline underline-offset-4">
        {generationLabel}
      </h4>

      <ul className="flex flex-col gap-1.5">
        {rows.map((row) => (
          <li
            key={row.value}
            className="flex items-center justify-between gap-2 text-sm font-medium text-neutral-800"
          >
            <span>{row.label}</span>
            <span>{percentByFlightPath[row.value]}%</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default FireFeasibilityFlightPathResultColumn
