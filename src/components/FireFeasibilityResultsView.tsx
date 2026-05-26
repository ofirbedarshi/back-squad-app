import type {
  FireFeasibilityCloudsResults,
  FireFeasibilityFormData,
} from '../domain/fireFeasibility.types'
import FireFeasibilityCloudsResultsBlock from './FireFeasibilityCloudsResultsBlock'

interface FireFeasibilityResultsViewProps {
  clouds: FireFeasibilityCloudsResults
  formData: FireFeasibilityFormData
}

function FireFeasibilityResultsView({
  clouds,
  formData: _formData,
}: FireFeasibilityResultsViewProps) {
  return (
    <div className="flex flex-col gap-5">
      <FireFeasibilityCloudsResultsBlock clouds={clouds} />
    </div>
  )
}

export default FireFeasibilityResultsView
