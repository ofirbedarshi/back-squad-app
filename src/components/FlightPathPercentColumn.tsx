import { FIRE_FEASIBILITY_NOT_IMPLEMENTED_NOTE } from '../domain/fireFeasibility.constants'
import type { FireFeasibilityFlightPathResultRow } from '../domain/fireFeasibility.constants'
import type { FireFeasibilityFlightPathPercentByPath } from '../domain/fireFeasibility.types'

interface FlightPathPercentColumnProps {
  generationLabel: string
  rows: readonly FireFeasibilityFlightPathResultRow[]
  percentByFlightPath: FireFeasibilityFlightPathPercentByPath
  showNotImplementedPlaceholder?: boolean
  compact?: boolean
}

function FlightPathPercentColumn({
  generationLabel,
  rows,
  percentByFlightPath,
  showNotImplementedPlaceholder = false,
  compact = false,
}: FlightPathPercentColumnProps) {
  const containerClass = compact
    ? 'flex flex-1 flex-col gap-1.5 rounded-lg border border-neutral-200 bg-neutral-50 p-2'
    : 'flex flex-1 flex-col gap-2 rounded-xl border border-neutral-200 bg-neutral-50 p-3'
  const titleClass = compact
    ? 'text-center text-xs font-bold text-neutral-800'
    : 'text-center text-sm font-bold text-neutral-800'
  const rowClass = compact
    ? 'flex items-center justify-between gap-2 rounded-md bg-white px-1.5 py-0.5 text-xs font-medium text-neutral-800'
    : 'flex items-center justify-between gap-2 rounded-lg bg-white px-2 py-1 text-sm font-medium text-neutral-800'

  return (
    <div className={containerClass}>
      <h4 className={titleClass}>{generationLabel}</h4>

      {showNotImplementedPlaceholder ? (
        <p className="text-center text-xs text-neutral-500 py-1">
          {FIRE_FEASIBILITY_NOT_IMPLEMENTED_NOTE}
        </p>
      ) : (
        <ul className="flex flex-col gap-1.5">
          {rows.map((row) => (
            <li key={row.value} className={rowClass}>
              <span>{row.label}</span>
              <span>{percentByFlightPath[row.value]}%</span>
            </li>
          ))}
        </ul>
      )}
    </div>
  )
}

export default FlightPathPercentColumn
