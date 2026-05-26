import type { FireFeasibilityCategoryResult } from '../domain/fireFeasibility.types'

interface FireFeasibilityCategoryResultBlockProps {
  title?: string
  generationLabel?: string
  result: FireFeasibilityCategoryResult
}

function FireFeasibilityCategoryResultBlock({
  title,
  generationLabel,
  result,
}: FireFeasibilityCategoryResultBlockProps) {
  return (
    <section className="flex flex-col gap-2">
      {title ? (
        <h3 className="text-center text-base font-bold text-neutral-800">{title}</h3>
      ) : null}

      <div className="flex flex-col gap-2 rounded-xl bg-neutral-200/70 px-4 py-4 text-center">
        {generationLabel ? (
          <p className="text-sm font-bold text-neutral-700">{generationLabel}</p>
        ) : null}
        <div className="text-lg font-bold">
          {result.enabled ? (
            <span className="text-neutral-800">מאפשר</span>
          ) : (
            <span className="text-red-600">לא מאפשר</span>
          )}
        </div>
        {result.notes ? (
          <p className="text-sm font-medium text-neutral-600 leading-relaxed">{result.notes}</p>
        ) : null}
      </div>
    </section>
  )
}

export default FireFeasibilityCategoryResultBlock
