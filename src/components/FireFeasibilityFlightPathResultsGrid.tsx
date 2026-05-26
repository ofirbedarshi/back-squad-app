import {
  FIRE_FEASIBILITY_FLIGHT_PATH_RESULT_ROWS,
  FIRE_FEASIBILITY_GENERATION_LABELS,
} from '../domain/fireFeasibility.constants'
import type {
  FireFeasibilityFlightPathResultsByGeneration,
  FireFeasibilityGeneration,
} from '../domain/fireFeasibility.types'
import FireFeasibilityFlightPathResultColumn from './FireFeasibilityFlightPathResultColumn'

const GENERATION_ORDER: FireFeasibilityGeneration[] = ['a', 'b']

interface FireFeasibilityFlightPathResultsGridProps {
  results: FireFeasibilityFlightPathResultsByGeneration
}

function FireFeasibilityFlightPathResultsGrid({
  results,
}: FireFeasibilityFlightPathResultsGridProps) {
  return (
    <div className="flex gap-6 rounded-xl bg-neutral-200/70 px-4 py-4">
      {GENERATION_ORDER.map((generation) => (
        <FireFeasibilityFlightPathResultColumn
          key={generation}
          generationLabel={FIRE_FEASIBILITY_GENERATION_LABELS[generation]}
          rows={FIRE_FEASIBILITY_FLIGHT_PATH_RESULT_ROWS}
          percentByFlightPath={results[generation]}
        />
      ))}
    </div>
  )
}

export default FireFeasibilityFlightPathResultsGrid
