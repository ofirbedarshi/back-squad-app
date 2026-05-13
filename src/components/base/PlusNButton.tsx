interface PlusNButtonProps {
  n: number
  isApplied: boolean
  onApply: () => void
}

function PlusNButton({ n, isApplied, onApply }: PlusNButtonProps) {
  if (isApplied) {
    return (
      <span className="text-xs font-bold text-emerald-600 whitespace-nowrap flex items-center gap-0.5 px-1">
        ✓ +{n}
      </span>
    )
  }

  return (
    <button
      type="button"
      onClick={onApply}
      className="text-xs font-bold text-white bg-neutral-700 rounded-xl px-2.5 py-2 whitespace-nowrap active:scale-95 transition-transform touch-manipulation select-none"
    >
      +{n}
    </button>
  )
}

export default PlusNButton
