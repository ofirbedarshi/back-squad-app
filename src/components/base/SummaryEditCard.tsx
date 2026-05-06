import type { SummaryEditCardProps } from './summaryEditCard.types'

function SummaryEditCard({ summary, onEdit, editButtonLabel, disabled = false }: SummaryEditCardProps) {
  return (
    <section className="bg-white rounded-2xl border border-neutral-200 p-4 shadow-sm">
      <div className="flex items-center justify-between gap-3">
        <div className="min-w-0 text-sm text-neutral-600 leading-6">{summary}</div>
        <button
          type="button"
          onClick={onEdit}
          disabled={disabled}
          aria-label={editButtonLabel}
          className="shrink-0 h-9 w-9 rounded-xl border border-neutral-300 text-neutral-700 flex items-center justify-center active:bg-neutral-100 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          <svg viewBox="0 0 24 24" className="h-4 w-4" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <path
              d="M4 20H8L18.5 9.5C19.3 8.7 19.3 7.3 18.5 6.5L17.5 5.5C16.7 4.7 15.3 4.7 14.5 5.5L4 16V20Z"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path d="M13.5 6.5L17.5 10.5" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" />
          </svg>
        </button>
      </div>
    </section>
  )
}

export default SummaryEditCard
