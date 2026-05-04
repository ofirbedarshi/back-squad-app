interface DomainErrorAlertProps {
  message: string
  onDismiss: () => void
  variant?: 'error' | 'warning'
}

const VARIANT_STYLES = {
  error: {
    title: 'שגיאת Domain',
    indicator: '✕',
    indicatorClass: 'bg-red-100 text-red-600',
    titleClass: 'text-red-700',
  },
  warning: {
    title: 'שגיאת UI',
    indicator: '⚠',
    indicatorClass: 'bg-orange-100 text-orange-500',
    titleClass: 'text-orange-600',
  },
}

function DomainErrorAlert({ message, onDismiss, variant = 'error' }: DomainErrorAlertProps) {
  const styles = VARIANT_STYLES[variant]

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-6">
      <div dir="rtl" className="w-full max-w-sm bg-white rounded-2xl shadow-xl overflow-hidden">
        <div className="px-5 pt-6 pb-4 flex flex-col gap-3">
          <div className="flex items-center gap-2">
            <span className={`text-sm font-bold w-6 h-6 flex items-center justify-center rounded-full ${styles.indicatorClass}`}>
              {styles.indicator}
            </span>
            <span className={`font-bold text-base ${styles.titleClass}`}>{styles.title}</span>
          </div>
          <p className="text-sm text-neutral-600 leading-relaxed">{message}</p>
        </div>
        <div className="border-t border-neutral-100">
          <button
            type="button"
            onClick={onDismiss}
            className="w-full py-4 text-base font-semibold text-blue-600 active:bg-neutral-50 transition-colors touch-manipulation select-none"
          >
            אישור
          </button>
        </div>
      </div>
    </div>
  )
}

export default DomainErrorAlert
