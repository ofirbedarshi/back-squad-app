import type { FireFeasibilityCategoryResult } from '../domain/fireFeasibility.types'
import FireFeasibilityCategoryResultBlock from './FireFeasibilityCategoryResultBlock'

interface FireFeasibilityResultsViewProps {
  clouds: FireFeasibilityCategoryResult
}

function FireFeasibilityResultsView({ clouds }: FireFeasibilityResultsViewProps) {
  return (
    <div className="flex flex-col gap-5">
      <FireFeasibilityCategoryResultBlock title="עננים" result={clouds} />
    </div>
  )
}

export default FireFeasibilityResultsView
