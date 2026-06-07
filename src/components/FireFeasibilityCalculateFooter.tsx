interface FireFeasibilityCalculateFooterProps {
  onCalculate: () => void
  disabled?: boolean
}

function FireFeasibilityCalculateFooter({ onCalculate, disabled = false }: FireFeasibilityCalculateFooterProps) {
  return (
    <footer className="sticky bottom-0 shrink-0 border-t border-neutral-200/60 bg-neutral-50 px-3 py-2">
      <button
        type="button"
        onClick={onCalculate}
        disabled={disabled}
        className="w-full rounded-xl bg-blue-600 py-2.5 text-sm font-bold text-white shadow-md shadow-blue-600/15 touch-manipulation transition-colors active:bg-blue-700 disabled:cursor-not-allowed disabled:bg-neutral-300 disabled:text-neutral-500 disabled:shadow-none"
      >
        חשב
      </button>
    </footer>
  )
}

export default FireFeasibilityCalculateFooter
