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
  const logLines = result.logs ?? []
  const statusLabel = result.enabled ? 'מאפשר' : 'לא מאפשר'
  const statusClassName = result.enabled
    ? 'border-emerald-200 bg-emerald-50 text-emerald-700'
    : 'border-red-200 bg-red-50 text-red-700'

  return (
    <section className="flex flex-col gap-2">
      {title ? (
        <h3 className="text-center text-base font-bold text-neutral-800">{title}</h3>
      ) : null}

      <div className="flex h-full flex-col gap-3 rounded-2xl border border-neutral-200 bg-white px-4 py-4 text-center shadow-sm">
        {generationLabel ? (
          <p className="text-sm font-bold text-neutral-700">{generationLabel}</p>
        ) : null}

        <div className="flex justify-center">
          <span
            className={`inline-flex min-w-[112px] items-center justify-center rounded-full border px-3 py-1 text-base font-bold ${statusClassName}`}
          >
            {statusLabel}
          </span>
        </div>

        {result.notes ? (
          <p className="text-sm font-medium leading-relaxed text-neutral-700">{result.notes}</p>
        ) : null}

        {logLines.length > 0 ? (
          <details className="rounded-xl border border-neutral-200 bg-neutral-50 px-3 py-2 text-start" dir="rtl">
            <summary className="cursor-pointer text-sm font-semibold text-neutral-700">
              מידע חישוב
            </summary>
            <ul className="mt-2 list-disc space-y-1 ps-4 text-sm font-medium leading-relaxed text-neutral-600">
              {logLines.map((line) => (
                <li key={line}>{line}</li>
              ))}
            </ul>
          </details>
        ) : null}
      </div>
    </section>
  )
}

export default FireFeasibilityCategoryResultBlock
