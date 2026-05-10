import type { ConfirmVariant } from '../../context/confirm.types'

export interface ConfirmDialogProps {
  title: string
  message: string
  confirmLabel: string
  cancelLabel: string
  variant: ConfirmVariant
  onConfirm: () => void
  onCancel: () => void
}

function confirmButtonClass(variant: ConfirmVariant): string {
  if (variant === 'danger') {
    return 'flex-1 py-3 rounded-xl bg-red-600 text-white font-semibold text-base active:brightness-90 touch-manipulation select-none'
  }
  return 'flex-1 py-3 rounded-xl bg-blue-600 text-white font-semibold text-base active:brightness-90 touch-manipulation select-none'
}

function ConfirmDialog({
  title,
  message,
  confirmLabel,
  cancelLabel,
  variant,
  onConfirm,
  onCancel,
}: ConfirmDialogProps) {
  return (
    <div
      className="fixed inset-0 z-[70] flex items-center justify-center bg-black/45 p-4"
      role="presentation"
      onClick={onCancel}
    >
      <div
        dir="rtl"
        role="dialog"
        aria-modal="true"
        aria-labelledby="confirm-dialog-title"
        className="w-full max-w-sm rounded-2xl border border-neutral-200 bg-white p-4 shadow-xl"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 id="confirm-dialog-title" className="text-base font-bold text-neutral-900 text-center mb-2">
          {title}
        </h2>
        <p className="text-sm text-neutral-600 text-center leading-relaxed mb-5">{message}</p>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={onCancel}
            className="flex-1 py-3 rounded-xl border border-neutral-200 bg-neutral-50 text-neutral-800 font-semibold text-base active:bg-neutral-100 touch-manipulation select-none"
          >
            {cancelLabel}
          </button>
          <button type="button" onClick={onConfirm} className={confirmButtonClass(variant)}>
            {confirmLabel}
          </button>
        </div>
      </div>
    </div>
  )
}

export default ConfirmDialog
