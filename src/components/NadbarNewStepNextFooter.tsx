interface NadbarNewStepNextFooterProps {
  canProceed: boolean
  onNext: () => void
}

function NadbarNewStepNextFooter({ canProceed, onNext }: NadbarNewStepNextFooterProps) {
  return (
    <footer className="sticky bottom-0 shrink-0 border-t border-neutral-200/60 bg-gradient-to-t from-neutral-50 via-neutral-50/95 to-neutral-50/70 p-4 backdrop-blur-sm">
      <button
        type="button"
        disabled={!canProceed}
        onClick={onNext}
        className={[
          'w-full rounded-2xl py-3.5 text-base font-bold touch-manipulation transition-colors',
          canProceed
            ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20 active:bg-blue-700'
            : 'cursor-not-allowed bg-neutral-200 text-neutral-400',
        ].join(' ')}
      >
        הבא
      </button>
    </footer>
  )
}

export default NadbarNewStepNextFooter
