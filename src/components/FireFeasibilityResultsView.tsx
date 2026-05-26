import type {
  FireFeasibilityCategoryResult,
  FireFeasibilityFormData,
} from '../domain/fireFeasibility.types'
import FireFeasibilityCategoryResultBlock from './FireFeasibilityCategoryResultBlock'

interface FireFeasibilityResultsViewProps {
  clouds: FireFeasibilityCategoryResult
  formData: FireFeasibilityFormData
}

function FireFeasibilityResultsView({
  clouds,
  formData: _formData,
}: FireFeasibilityResultsViewProps) {
  return (
    <div className="flex flex-col gap-5">
      <FireFeasibilityCategoryResultBlock title="עננים" result={clouds} />
    </div>
  )
}

export default FireFeasibilityResultsView
