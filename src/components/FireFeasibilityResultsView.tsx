import { FIRE_FEASIBILITY_CATEGORY_TITLES } from '../domain/fireFeasibility.constants'
import { hasAnyFireFeasibilityCategoryEnabled } from '../domain/fireFeasibility'
import type { FireFeasibilityResults } from '../domain/fireFeasibility.types'
import FireFeasibilityCategoryResultsSection from './FireFeasibilityCategoryResultsSection'
import FireFeasibilityFlightPathResultsGrid from './FireFeasibilityFlightPathResultsGrid'

interface FireFeasibilityResultsViewProps {
  results: FireFeasibilityResults
}

function FireFeasibilityResultsView({ results }: FireFeasibilityResultsViewProps) {
  const showHitProbability = hasAnyFireFeasibilityCategoryEnabled(results)

  return (
    <div className="mx-auto flex w-full max-w-2xl flex-col gap-4">
      <FireFeasibilityCategoryResultsSection
        title={FIRE_FEASIBILITY_CATEGORY_TITLES.clouds}
        results={results.clouds}
      />
      <FireFeasibilityCategoryResultsSection
        title={FIRE_FEASIBILITY_CATEGORY_TITLES.obstacles}
        results={results.obstacles}
      />
      <FireFeasibilityCategoryResultsSection
        title={FIRE_FEASIBILITY_CATEGORY_TITLES.concealment}
        results={results.concealment}
      />
      {showHitProbability ? (
        <FireFeasibilityFlightPathResultsGrid results={results.flightPaths} />
      ) : null}
    </div>
  )
}

export default FireFeasibilityResultsView
