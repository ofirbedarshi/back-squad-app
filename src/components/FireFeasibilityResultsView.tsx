import { FIRE_FEASIBILITY_CATEGORY_TITLES } from '../domain/fireFeasibility.constants'
import type { FireFeasibilityFormData, FireFeasibilityResults } from '../domain/fireFeasibility.types'
import FireFeasibilityCategoryResultsSection from './FireFeasibilityCategoryResultsSection'
import FireFeasibilityFlightPathResultsGrid from './FireFeasibilityFlightPathResultsGrid'

interface FireFeasibilityResultsViewProps {
  results: FireFeasibilityResults
  formData: FireFeasibilityFormData
}

function FireFeasibilityResultsView({
  results,
  formData: _formData,
}: FireFeasibilityResultsViewProps) {
  return (
    <div className="flex flex-col gap-5">
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
      <FireFeasibilityFlightPathResultsGrid results={results.flightPaths} />
    </div>
  )
}

export default FireFeasibilityResultsView
