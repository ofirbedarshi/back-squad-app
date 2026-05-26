import { FIRE_FEASIBILITY_GENERATION_LABELS } from '../domain/fireFeasibility.constants'
import type {
  FireFeasibilityCategoryResultsByGeneration,
  FireFeasibilityGeneration,
} from '../domain/fireFeasibility.types'
import FireFeasibilityCategoryResultBlock from './FireFeasibilityCategoryResultBlock'

const GENERATION_ORDER: FireFeasibilityGeneration[] = ['a', 'b']

interface FireFeasibilityCategoryResultsSectionProps {
  title: string
  results: FireFeasibilityCategoryResultsByGeneration
}

function FireFeasibilityCategoryResultsSection({
  title,
  results,
}: FireFeasibilityCategoryResultsSectionProps) {
  return (
    <section className="flex flex-col gap-3">
      <h3 className="text-center text-base font-bold text-neutral-800">{title}</h3>

      <div className="flex flex-col gap-3">
        {GENERATION_ORDER.map((generation) => (
          <FireFeasibilityCategoryResultBlock
            key={generation}
            generationLabel={FIRE_FEASIBILITY_GENERATION_LABELS[generation]}
            result={results[generation]}
          />
        ))}
      </div>
    </section>
  )
}

export default FireFeasibilityCategoryResultsSection
