import {
  FIRE_FEASIBILITY_FLIGHT_PATH_RESULT_ROWS,
  FIRE_FEASIBILITY_GENERATION_LABELS,
} from '../domain/fireFeasibility.constants'
import type {
  FireFeasibilityFlightPathResultsByGeneration,
  FireFeasibilityGeneration,
} from '../domain/fireFeasibility.types'
import FireFeasibilityFlightPathLogsPanel from './FireFeasibilityFlightPathLogsPanel'
import FireFeasibilityFlightPathResultColumn from './FireFeasibilityFlightPathResultColumn'

const GENERATION_ORDER: FireFeasibilityGeneration[] = ['a', 'b']

interface FireFeasibilityFlightPathResultsGridProps {
  results: FireFeasibilityFlightPathResultsByGeneration
}

function FireFeasibilityFlightPathResultsGrid({
  results,
}: FireFeasibilityFlightPathResultsGridProps) {
  return (
    <section className="rounded-2xl border border-neutral-200 bg-white p-4 shadow-sm">
      <h3 className="mb-3 text-center text-lg font-bold text-neutral-800">חישוב סיכוי</h3>
      <div className="flex gap-6">
      {GENERATION_ORDER.map((generation) => (
        <FireFeasibilityFlightPathResultColumn
          key={generation}
          generationLabel={FIRE_FEASIBILITY_GENERATION_LABELS[generation]}
          rows={FIRE_FEASIBILITY_FLIGHT_PATH_RESULT_ROWS}
          percentByFlightPath={results[generation].percentByFlightPath}
        />
      ))}
      </div>

      <FireFeasibilityFlightPathLogsPanel results={results} />
    </section>
  )
}

export default FireFeasibilityFlightPathResultsGrid
