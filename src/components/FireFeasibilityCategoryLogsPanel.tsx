import { useMemo, useState } from 'react'
import { FIRE_FEASIBILITY_GENERATION_LABELS } from '../domain/fireFeasibility.constants'
import type {
  FireFeasibilityCategoryResultsByGeneration,
  FireFeasibilityGeneration,
} from '../domain/fireFeasibility.types'

const GENERATION_ORDER: FireFeasibilityGeneration[] = ['a', 'b']

interface FireFeasibilityCategoryLogsPanelProps {
  results: FireFeasibilityCategoryResultsByGeneration
}

function FireFeasibilityCategoryLogsPanel({ results }: FireFeasibilityCategoryLogsPanelProps) {
  const [activeGeneration, setActiveGeneration] = useState<FireFeasibilityGeneration>('a')

  const activeLogs = useMemo(
    () => results[activeGeneration]?.logs ?? [],
    [activeGeneration, results],
  )

  if ((results.a?.logs?.length ?? 0) === 0 && (results.b?.logs?.length ?? 0) === 0) {
    return null
  }

  return (
    <details className="rounded-xl border border-neutral-200 bg-neutral-50 px-3 py-3" dir="rtl">
      <summary className="cursor-pointer text-sm font-semibold text-neutral-700">מידע חישוב</summary>

      <div className="mt-3 flex flex-col gap-3">
        <div className="grid grid-cols-2 gap-2 rounded-lg bg-white p-1">
          {GENERATION_ORDER.map((generation) => {
            const isActive = activeGeneration === generation
            return (
              <button
                key={generation}
                type="button"
                onClick={() => setActiveGeneration(generation)}
                className={`rounded-md px-3 py-1.5 text-sm font-semibold transition-colors ${
                  isActive
                    ? 'bg-blue-600 text-white'
                    : 'bg-neutral-100 text-neutral-700 active:bg-neutral-200'
                }`}
                aria-pressed={isActive}
              >
                {FIRE_FEASIBILITY_GENERATION_LABELS[generation]}
              </button>
            )
          })}
        </div>

        {activeLogs.length > 0 ? (
          <ul className="space-y-1.5 rounded-lg border border-neutral-200 bg-white p-3 text-sm font-medium leading-relaxed text-neutral-700">
            {activeLogs.map((line, index) => (
              <li key={`${activeGeneration}-${line}-${index}`} className="break-words">
                {line}
              </li>
            ))}
          </ul>
        ) : (
          <p className="rounded-lg border border-neutral-200 bg-white p-3 text-sm font-medium text-neutral-500">
            אין מידע חישוב עבור {FIRE_FEASIBILITY_GENERATION_LABELS[activeGeneration]}.
          </p>
        )}
      </div>
    </details>
  )
}

export default FireFeasibilityCategoryLogsPanel
