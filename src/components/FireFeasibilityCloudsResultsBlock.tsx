import { FIRE_FEASIBILITY_GENERATION_LABELS } from '../domain/fireFeasibility.constants'
import type { FireFeasibilityCloudsResults, FireFeasibilityGeneration } from '../domain/fireFeasibility.types'
import FireFeasibilityCategoryResultBlock from './FireFeasibilityCategoryResultBlock'

const GENERATION_ORDER: FireFeasibilityGeneration[] = ['a', 'b']

interface FireFeasibilityCloudsResultsBlockProps {
  clouds: FireFeasibilityCloudsResults
}

function FireFeasibilityCloudsResultsBlock({ clouds }: FireFeasibilityCloudsResultsBlockProps) {
  return (
    <section className="flex flex-col gap-3">
      <h3 className="text-center text-base font-bold text-neutral-800">עננים</h3>

      <div className="flex flex-col gap-3">
        {GENERATION_ORDER.map((generation) => (
          <FireFeasibilityCategoryResultBlock
            key={generation}
            generationLabel={FIRE_FEASIBILITY_GENERATION_LABELS[generation]}
            result={clouds[generation]}
          />
        ))}
      </div>
    </section>
  )
}

export default FireFeasibilityCloudsResultsBlock
