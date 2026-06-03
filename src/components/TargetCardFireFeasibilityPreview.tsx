import type {
  FireFeasibilityFlightPathResultsByGeneration,
} from '../domain/fireFeasibility.types'
import type { TargetCloudsFeasibilityPreview } from '../useCases/calculateTargetCloudsFeasibilityPreview.types'
import TargetCardFireFeasibilityCompactGrid from './TargetCardFireFeasibilityCompactGrid'

interface TargetCardFireFeasibilityPreviewProps {
  hitProbability: FireFeasibilityFlightPathResultsByGeneration | null
  clouds: TargetCloudsFeasibilityPreview | null
}

function TargetCardFireFeasibilityPreview({
  hitProbability,
  clouds,
}: TargetCardFireFeasibilityPreviewProps) {
  if (!hitProbability && !clouds) {
    return null
  }

  return (
    <TargetCardFireFeasibilityCompactGrid hitProbability={hitProbability} clouds={clouds} />
  )
}

export default TargetCardFireFeasibilityPreview
