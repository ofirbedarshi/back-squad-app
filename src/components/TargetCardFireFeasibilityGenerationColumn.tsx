import { FIRE_FEASIBILITY_NOT_IMPLEMENTED_NOTE } from '../domain/fireFeasibility.constants'
import type { FireFeasibilityFlightPathResultRow } from '../domain/fireFeasibility.constants'
import type { FireFeasibilityFlightPathPercentByPath } from '../domain/fireFeasibility.types'
import type { CloudsFeasibilityFlightPathCellsByPath } from '../useCases/buildCloudsFeasibilityFlightPathResultsByGeneration.types'
import TargetCardFireFeasibilityFlightPathRow from './TargetCardFireFeasibilityFlightPathRow'

interface TargetCardFireFeasibilityGenerationColumnProps {
  generationLabel: string
  rows: readonly FireFeasibilityFlightPathResultRow[]
  percentByFlightPath: FireFeasibilityFlightPathPercentByPath | null
  showHitNotImplementedPlaceholder: boolean
  cellsByFlightPath: CloudsFeasibilityFlightPathCellsByPath | null
}

function TargetCardFireFeasibilityGenerationColumn({
  generationLabel,
  rows,
  percentByFlightPath,
  showHitNotImplementedPlaceholder,
  cellsByFlightPath,
}: TargetCardFireFeasibilityGenerationColumnProps) {
  const showHit = percentByFlightPath !== null
  const showCloud = cellsByFlightPath !== null
  const showHitValues = showHit && !showHitNotImplementedPlaceholder
  const hasFlightPathRows = showCloud || showHitValues

  return (
    <div className="flex min-w-0 flex-1 flex-col gap-0.5 rounded-md border border-neutral-200 bg-neutral-50 px-1.5 py-1">
      <h4 className="text-center text-[11px] font-bold leading-tight text-neutral-800">
        {generationLabel}
      </h4>

      {showHit || showCloud ? (
        <div className="flex justify-end gap-1.5 pe-0 text-[10px] leading-none text-neutral-400">
          <span className="w-7" />
          {showHitValues ? <span className="w-8 text-end">פגיעה</span> : null}
          {showCloud ? <span className="w-8 text-end">ענן</span> : null}
        </div>
      ) : null}

      {showHitNotImplementedPlaceholder ? (
        <p className="text-center text-[10px] leading-tight text-neutral-500">
          {FIRE_FEASIBILITY_NOT_IMPLEMENTED_NOTE}
        </p>
      ) : null}

      {hasFlightPathRows ? (
        <ul className="flex flex-col gap-px">
          {rows.map((row) => (
            <TargetCardFireFeasibilityFlightPathRow
              key={row.value}
              flightPathLabel={row.label}
              hitPercent={showHitValues ? percentByFlightPath[row.value] : null}
              cloudCell={showCloud ? cellsByFlightPath[row.value] : null}
            />
          ))}
        </ul>
      ) : null}
    </div>
  )
}

export default TargetCardFireFeasibilityGenerationColumn
