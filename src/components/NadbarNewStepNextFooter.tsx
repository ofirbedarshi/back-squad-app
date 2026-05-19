interface NadbarNewStepNextFooterProps {
  canProceed: boolean
  onNext: () => void
}

function NadbarNewStepNextFooter({ canProceed, onNext }: NadbarNewStepNextFooterProps) {
  return (
    <footer className="sticky bottom-0 shrink-0 border-t border-neutral-200/60 bg-neutral-50 px-3 py-2">
      <button
        type="button"
        disabled={!canProceed}
        onClick={onNext}
        className={[
          'w-full rounded-xl py-2.5 text-sm font-bold touch-manipulation transition-colors',
          canProceed
            ? 'bg-blue-600 text-white shadow-md shadow-blue-600/15 active:bg-blue-700'
            : 'cursor-not-allowed bg-neutral-200 text-neutral-400',
        ].join(' ')}
      >
        הבא
      </button>
    </footer>
  )
}

export default NadbarNewStepNextFooter
