import { FIRE_FEASIBILITY_RESULTS_TITLE } from '../domain/fireFeasibilityModeConfig'
import type { FireFeasibilityResults } from '../domain/fireFeasibility.types'
import FireFeasibilityResultsView from './FireFeasibilityResultsView'

interface FireFeasibilityResultsStepProps {
  results: FireFeasibilityResults
  onSave: () => void
}

function FireFeasibilityResultsStep({ results, onSave }: FireFeasibilityResultsStepProps) {
  return (
    <div dir="rtl" className="flex min-h-full flex-col bg-neutral-50">
      <header className="sticky top-0 z-10 shrink-0 border-b border-neutral-200 bg-white px-4 py-3">
        <div className="flex items-center gap-2">
          <span className="min-w-0 flex-1 truncate px-1 text-center text-lg font-bold text-neutral-800">
            {FIRE_FEASIBILITY_RESULTS_TITLE}
          </span>
          <button
            type="button"
            onClick={onSave}
            className="shrink-0 touch-manipulation rounded-xl bg-blue-600 px-3 py-1.5 text-sm font-bold text-white active:bg-blue-700"
          >
            שמור
          </button>
        </div>
      </header>

      <div className="p-4">
        <FireFeasibilityResultsView results={results} />
      </div>
    </div>
  )
}

export default FireFeasibilityResultsStep
