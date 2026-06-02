import { FIRE_FEASIBILITY_GENERATION_LABELS } from '../domain/fireFeasibility.constants'
import type {
  FireFeasibilityCategoryResult,
  FireFeasibilityCategoryResultsByGeneration,
  FireFeasibilityGeneration,
} from '../domain/fireFeasibility.types'
import FireFeasibilityCategoryLogsPanel from './FireFeasibilityCategoryLogsPanel'
import FireFeasibilityCategoryResultBlock from './FireFeasibilityCategoryResultBlock'

const GENERATION_ORDER: FireFeasibilityGeneration[] = ['a', 'b']

const EMPTY_CATEGORY_RESULT: FireFeasibilityCategoryResult = {
  enabled: false,
  notes: '',
  logs: [],
}

interface FireFeasibilityCategoryResultsSectionProps {
  title: string
  results: FireFeasibilityCategoryResultsByGeneration
}

function FireFeasibilityCategoryResultsSection({
  title,
  results,
}: FireFeasibilityCategoryResultsSectionProps) {
  return (
    <section className="flex flex-col gap-3 rounded-2xl border border-neutral-200 bg-white p-4 shadow-sm">
      <h3 className="text-center text-lg font-bold text-neutral-800">{title}</h3>

      <div className="grid grid-cols-2 gap-3">
        {GENERATION_ORDER.map((generation) => (
          <FireFeasibilityCategoryResultBlock
            key={generation}
            generationLabel={FIRE_FEASIBILITY_GENERATION_LABELS[generation]}
            result={results[generation] ?? EMPTY_CATEGORY_RESULT}
            showLogs={false}
          />
        ))}
      </div>

      <FireFeasibilityCategoryLogsPanel results={results} />
    </section>
  )
}

export default FireFeasibilityCategoryResultsSection
