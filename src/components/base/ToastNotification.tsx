import type { NotificationVariant } from '../../context/notification.types'

interface ToastNotificationProps {
  message: string
  variant: NotificationVariant
  onDismiss: () => void
}

const VARIANT_STYLES: Record<NotificationVariant, { containerClass: string; iconClass: string; icon: string }> = {
  success: {
    containerClass: 'bg-green-50 border-green-200 text-green-800',
    iconClass: 'bg-green-100 text-green-600',
    icon: '✓',
  },
  error: {
    containerClass: 'bg-red-50 border-red-200 text-red-800',
    iconClass: 'bg-red-100 text-red-600',
    icon: '✕',
  },
  info: {
    containerClass: 'bg-blue-50 border-blue-200 text-blue-800',
    iconClass: 'bg-blue-100 text-blue-600',
    icon: 'ℹ',
  },
}

function ToastNotification({ message, variant, onDismiss }: ToastNotificationProps) {
  const styles = VARIANT_STYLES[variant]

  return (
    <div
      dir="rtl"
      className={`fixed top-4 inset-x-4 z-[60] flex items-center gap-3 px-4 py-3 rounded-2xl border shadow-lg toast-slide-in ${styles.containerClass}`}
      role="status"
      aria-live="polite"
    >
      <span className={`flex-shrink-0 w-7 h-7 flex items-center justify-center rounded-full text-sm font-bold ${styles.iconClass}`}>
        {styles.icon}
      </span>
      <p className="flex-1 text-sm font-semibold leading-snug">{message}</p>
      <button
        type="button"
        onClick={onDismiss}
        aria-label="סגור הודעה"
        className="flex-shrink-0 w-6 h-6 flex items-center justify-center rounded-full text-current opacity-50 active:opacity-100 touch-manipulation"
      >
        ✕
      </button>
    </div>
  )
}

export default ToastNotification
