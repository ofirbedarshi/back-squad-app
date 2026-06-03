import {
  FIRE_FEASIBILITY_FLIGHT_PATH_RESULT_ROWS,
} from '../domain/fireFeasibility.constants'
import type {
  FireFeasibilityFlightPathResultsByGeneration,
  FireFeasibilityGeneration,
} from '../domain/fireFeasibility.types'
import type { TargetCloudsFeasibilityPreview } from '../useCases/calculateTargetCloudsFeasibilityPreview.types'
import { formatMetric } from '../utils/metricRounding'
import TargetCardFireFeasibilityCloudCell from './TargetCardFireFeasibilityCloudCell'
import TargetCardFireFeasibilityHitCell from './TargetCardFireFeasibilityHitCell'

const GENERATION_ORDER: FireFeasibilityGeneration[] = ['a', 'b']

const CARD_GENERATION_LABELS: Record<FireFeasibilityGeneration, string> = {
  a: 'א׳',
  b: 'ב׳',
}

interface TargetCardFireFeasibilityCompactGridProps {
  hitProbability: FireFeasibilityFlightPathResultsByGeneration | null
  clouds: TargetCloudsFeasibilityPreview | null
}

function generationColumnMeta(
  generation: FireFeasibilityGeneration,
  hitProbability: FireFeasibilityFlightPathResultsByGeneration | null,
  clouds: TargetCloudsFeasibilityPreview | null,
) {
  const hasHit = hitProbability !== null
  const showHitNotImplemented = hasHit && generation === 'a'
  const showHitValues = hasHit && !showHitNotImplemented
  const showCloud = clouds !== null
  const showHitColumn = hasHit
  const showCloudColumn = showCloud

  return {
    showHitNotImplemented,
    showHitValues,
    showHitColumn,
    showCloudColumn,
    cellsByFlightPath: clouds?.byGeneration[generation] ?? null,
    percentByFlightPath: hitProbability?.[generation].percentByFlightPath ?? null,
  }
}

function TargetCardFireFeasibilityCompactGrid({
  hitProbability,
  clouds,
}: TargetCardFireFeasibilityCompactGridProps) {
  return (
    <div className="flex min-w-0 flex-col gap-0.5">
      {clouds ? (
        <p className="text-[9px] leading-tight text-neutral-500">
          מעוף מקס׳{' '}
          <span className="font-bold tabular-nums text-neutral-700">
            {formatMetric(clouds.cloudCeilingMaxFlyHeightMeters)} מ׳
          </span>
        </p>
      ) : null}

      <div className="w-full rounded-md border border-neutral-200 text-[9px] leading-none">
        <div className="grid grid-cols-[1.125rem_1fr_1fr] border-b border-neutral-200 bg-neutral-100/90">
          <div aria-hidden="true" />
          {GENERATION_ORDER.map((generation) => {
            const meta = generationColumnMeta(generation, hitProbability, clouds)
            return (
              <div
                key={generation}
                className="grid grid-cols-2 border-s border-neutral-200 first:border-s-0"
              >
                <div className="col-span-2 py-px text-center font-bold text-neutral-800">
                  {CARD_GENERATION_LABELS[generation]}
                </div>
                {meta.showHitColumn ? (
                  <div className="py-px text-center text-neutral-400">פגיעה</div>
                ) : (
                  <div aria-hidden="true" />
                )}
                {meta.showCloudColumn ? (
                  <div className="py-px text-center text-neutral-400">ענן</div>
                ) : (
                  <div aria-hidden="true" />
                )}
              </div>
            )
          })}
        </div>

        <ul>
          {FIRE_FEASIBILITY_FLIGHT_PATH_RESULT_ROWS.map((row, index) => (
            <li
              key={row.value}
              className={[
                'grid grid-cols-[1.125rem_1fr_1fr]',
                index > 0 ? 'border-t border-neutral-100' : '',
                index % 2 === 0 ? 'bg-white' : 'bg-neutral-50/60',
              ]
                .filter(Boolean)
                .join(' ')}
            >
              <div className="flex items-center justify-center py-px font-bold text-neutral-700">
                {row.label}
              </div>
              {GENERATION_ORDER.map((generation) => {
                const meta = generationColumnMeta(generation, hitProbability, clouds)
                return (
                  <div
                    key={generation}
                    className="grid grid-cols-2 items-center border-s border-neutral-100 py-px first:border-s-0"
                  >
                    {meta.showHitColumn ? (
                      <div className="flex justify-center">
                        <TargetCardFireFeasibilityHitCell
                          hitPercent={meta.percentByFlightPath?.[row.value] ?? null}
                          showHitValues={meta.showHitValues}
                          showHitNotImplemented={meta.showHitNotImplemented}
                        />
                      </div>
                    ) : (
                      <div aria-hidden="true" />
                    )}
                    {meta.showCloudColumn ? (
                      <div className="flex justify-center">
                        <TargetCardFireFeasibilityCloudCell
                          cloudCell={meta.cellsByFlightPath?.[row.value] ?? null}
                        />
                      </div>
                    ) : (
                      <div aria-hidden="true" />
                    )}
                  </div>
                )
              })}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default TargetCardFireFeasibilityCompactGrid
