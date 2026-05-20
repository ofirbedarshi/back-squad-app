import type { FireFeasibilityCategoryResult } from '../domain/fireFeasibility.types'

interface FireFeasibilityCategoryResultBlockProps {
  title: string
  result: FireFeasibilityCategoryResult
}

function FireFeasibilityCategoryResultBlock({
  title,
  result,
}: FireFeasibilityCategoryResultBlockProps) {
  return (
    <section className="flex flex-col gap-2">
      <h3 className="text-center text-base font-bold text-neutral-800">{title}</h3>

      <div className="rounded-xl bg-neutral-200/70 px-4 py-4 text-center text-lg font-bold">
        {result.enabled ? (
          <span className="text-neutral-800">מאפשר</span>
        ) : (
          <span className="text-red-600">לא מאפשר</span>
        )}
      </div>

      {!result.enabled && result.blockingReason ? (
        <div className="flex flex-col gap-0.5 text-center text-sm">
          <span className="font-medium text-neutral-500">מה לא מאפשר</span>
          <span className="text-neutral-700">{result.blockingReason}</span>
        </div>
      ) : null}
    </section>
  )
}

export default FireFeasibilityCategoryResultBlock
