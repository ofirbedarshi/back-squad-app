interface LoadPickerLargeSelectedProps {
  displayName: string
  onReplace: () => void
  onClear: () => void
}

function LoadPickerLargeSelected({ displayName, onReplace, onClear }: LoadPickerLargeSelectedProps) {
  return (
    <div className="w-full flex flex-col items-center gap-3 py-2">
      <span className="text-lg font-bold text-neutral-800 text-center px-2">{displayName}</span>
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onReplace}
          className="text-sm font-semibold text-blue-600 active:opacity-70 touch-manipulation"
        >
          החלף
        </button>
        <button
          type="button"
          onClick={onClear}
          className="text-sm font-semibold text-neutral-500 active:opacity-70 touch-manipulation"
        >
          נקה
        </button>
      </div>
    </div>
  )
}

export default LoadPickerLargeSelected
