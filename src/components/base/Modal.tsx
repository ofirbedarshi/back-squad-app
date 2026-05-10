interface ModalProps {
  title: string
  onClose: () => void
  children: React.ReactNode
  /** When set, a primary "שמור" action is shown in the header next to cancel. */
  onSave?: () => void
  saveLabel?: string
  saveDisabled?: boolean
}

function Modal({ title, onClose, children, onSave, saveLabel = 'שמור', saveDisabled = false }: ModalProps) {
  return (
    <div className="fixed inset-x-0 top-0 bottom-16 z-40 flex items-end justify-center bg-black/40">
      <div
        dir="rtl"
        className="w-full max-h-[90svh] bg-white rounded-t-3xl flex flex-col overflow-hidden"
        style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
      >
        <div className="flex items-center justify-between px-4 py-4 border-b border-neutral-200 shrink-0 gap-3">
          <span className="font-bold text-neutral-800 text-base min-w-0 truncate">{title}</span>
          <div className="flex items-center gap-2 shrink-0">
            <button
              type="button"
              onClick={onClose}
              className="text-neutral-400 text-sm font-medium active:text-neutral-600 touch-manipulation px-1"
            >
              ביטול
            </button>
            {onSave ? (
              <button
                type="button"
                onClick={onSave}
                disabled={saveDisabled}
                className="text-sm font-bold text-white bg-blue-600 rounded-xl px-3 py-2 active:bg-blue-700 touch-manipulation disabled:opacity-40 disabled:pointer-events-none"
              >
                {saveLabel}
              </button>
            ) : null}
          </div>
        </div>

        <div className="flex-1 min-h-0 overflow-y-auto p-4">
          {children}
        </div>
      </div>
    </div>
  )
}

export default Modal
