import type { FireFeasibilityResults } from '../domain/fireFeasibility.types'
import FireFeasibilityCategoryResultBlock from './FireFeasibilityCategoryResultBlock'
import FireFeasibilityGenerationsPanel from './FireFeasibilityGenerationsPanel'
import FireFeasibilityResultsHeader from './FireFeasibilityResultsHeader'

interface FireFeasibilityResultsViewProps {
  positionName: string
  targetName: string
  results: FireFeasibilityResults
}

function FireFeasibilityResultsView({
  positionName,
  targetName,
  results,
}: FireFeasibilityResultsViewProps) {
  return (
    <div className="flex flex-col gap-5">
      <FireFeasibilityResultsHeader positionName={positionName} targetName={targetName} />

      <FireFeasibilityCategoryResultBlock title="מכשולים" result={results.obstacles} />
      <FireFeasibilityCategoryResultBlock title="עננים" result={results.clouds} />
      <FireFeasibilityCategoryResultBlock title="הסתרים" result={results.concealments} />

      <FireFeasibilityGenerationsPanel
        generationA={results.generationA}
        generationB={results.generationB}
      />
    </div>
  )
}

export default FireFeasibilityResultsView
