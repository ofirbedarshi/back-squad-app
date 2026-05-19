interface NadbarNewStepNextFooterProps {
  canProceed: boolean
  onNext: () => void
}

function NadbarNewStepNextFooter({ canProceed, onNext }: NadbarNewStepNextFooterProps) {
  return (
    <footer className="sticky bottom-0 bg-white border-t border-neutral-200 p-4 shrink-0">
      <button
        type="button"
        disabled={!canProceed}
        onClick={onNext}
        className={[
          'w-full py-3.5 rounded-2xl font-bold text-base touch-manipulation transition-colors',
          canProceed
            ? 'text-white bg-blue-600 active:bg-blue-700'
            : 'text-neutral-400 bg-neutral-100 cursor-not-allowed',
        ].join(' ')}
      >
        הבא
      </button>
    </footer>
  )
}

export default NadbarNewStepNextFooter
