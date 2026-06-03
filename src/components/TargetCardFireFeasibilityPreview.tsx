import {
  FIRE_FEASIBILITY_FLIGHT_PATH_RESULT_ROWS,
  FIRE_FEASIBILITY_GENERATION_LABELS,
} from '../domain/fireFeasibility.constants'
import type {
  FireFeasibilityFlightPathResultsByGeneration,
  FireFeasibilityGeneration,
} from '../domain/fireFeasibility.types'
import type { TargetCloudsFeasibilityPreview } from '../useCases/calculateTargetCloudsFeasibilityPreview.types'
import TargetCardFireFeasibilityGenerationColumn from './TargetCardFireFeasibilityGenerationColumn'
import TargetCardMaxFlyHeightLabel from './TargetCardMaxFlyHeightLabel'

const GENERATION_ORDER: FireFeasibilityGeneration[] = ['a', 'b']

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

  const tableSectionTitle = clouds ? 'סיכויי פגיעה · עננים' : 'סיכויי פגיעה'

  return (
    <div className="flex flex-col gap-1 pt-0.5">
      {clouds ? (
        <TargetCardMaxFlyHeightLabel
          maxFlyHeightMeters={clouds.cloudCeilingMaxFlyHeightMeters}
        />
      ) : null}
      <span className="text-[11px] font-semibold leading-tight text-neutral-500">
        {tableSectionTitle}
      </span>
      <div className="flex gap-2">
        {GENERATION_ORDER.map((generation) => (
          <TargetCardFireFeasibilityGenerationColumn
            key={generation}
            generationLabel={FIRE_FEASIBILITY_GENERATION_LABELS[generation]}
            rows={FIRE_FEASIBILITY_FLIGHT_PATH_RESULT_ROWS}
            percentByFlightPath={hitProbability?.[generation].percentByFlightPath ?? null}
            showHitNotImplementedPlaceholder={Boolean(hitProbability) && generation === 'a'}
            cellsByFlightPath={clouds?.byGeneration[generation] ?? null}
          />
        ))}
      </div>
    </div>
  )
}

export default TargetCardFireFeasibilityPreview
