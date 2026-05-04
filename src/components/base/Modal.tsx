interface ModalProps {
  title: string
  onClose: () => void
  children: React.ReactNode
}

function Modal({ title, onClose, children }: ModalProps) {
  return (
    <div className="fixed inset-x-0 top-0 bottom-16 z-40 flex items-end justify-center bg-black/40">
      <div
        dir="rtl"
        className="w-full max-h-[90svh] bg-white rounded-t-3xl flex flex-col overflow-hidden"
        style={{ paddingBottom: 'env(safe-area-inset-bottom)' }}
      >
        <div className="flex items-center justify-between px-4 py-4 border-b border-neutral-200 shrink-0">
          <span className="font-bold text-neutral-800 text-base">{title}</span>
          <button
            type="button"
            onClick={onClose}
            className="text-neutral-400 text-sm font-medium active:text-neutral-600 touch-manipulation px-1"
          >
            ביטול
          </button>
        </div>

        <div className="flex-1 min-h-0 overflow-y-auto p-4">
          {children}
        </div>
      </div>
    </div>
  )
}

export default Modal
