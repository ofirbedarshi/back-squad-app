import {
  FIRE_FEASIBILITY_FLIGHT_PATH_RESULT_ROWS,
  FIRE_FEASIBILITY_GENERATION_LABELS,
} from '../domain/fireFeasibility.constants'
import type {
  FireFeasibilityFlightPathResultsByGeneration,
  FireFeasibilityGeneration,
} from '../domain/fireFeasibility.types'
import FlightPathPercentColumn from './FlightPathPercentColumn'

const GENERATION_ORDER: FireFeasibilityGeneration[] = ['a', 'b']

interface TargetCardHitProbabilityPreviewProps {
  flightPaths: FireFeasibilityFlightPathResultsByGeneration
}

function TargetCardHitProbabilityPreview({ flightPaths }: TargetCardHitProbabilityPreviewProps) {
  return (
    <div className="flex flex-col gap-1.5 pt-0.5">
      <span className="text-xs font-semibold text-neutral-500">סיכויי פגיעה</span>
      <div className="flex gap-3">
        {GENERATION_ORDER.map((generation) => (
          <FlightPathPercentColumn
            key={generation}
            generationLabel={FIRE_FEASIBILITY_GENERATION_LABELS[generation]}
            rows={FIRE_FEASIBILITY_FLIGHT_PATH_RESULT_ROWS}
            percentByFlightPath={flightPaths[generation].percentByFlightPath}
            showNotImplementedPlaceholder={generation === 'a'}
            compact
          />
        ))}
      </div>
    </div>
  )
}

export default TargetCardHitProbabilityPreview
