export interface OptionsMenuItem {
  label: string
  variant?: 'default' | 'danger'
  onSelect: () => void
}

interface OptionsMenuProps {
  title?: string
  items: OptionsMenuItem[]
  onClose: () => void
}

function OptionsMenu({ title, items, onClose }: OptionsMenuProps) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-end bg-black/40"
      role="presentation"
      onClick={onClose}
    >
      <div
        dir="rtl"
        role="menu"
        className="w-full rounded-t-2xl bg-white shadow-2xl overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {title && (
          <div className="px-4 py-3 border-b border-neutral-100">
            <p className="text-sm font-semibold text-neutral-500 text-center">{title}</p>
          </div>
        )}

        <div className="flex flex-col divide-y divide-neutral-100">
          {items.map((item) => (
            <button
              key={item.label}
              type="button"
              role="menuitem"
              onClick={() => {
                item.onSelect()
                onClose()
              }}
              className={[
                'w-full py-4 px-4 text-base font-semibold text-center active:bg-neutral-100 touch-manipulation select-none transition-colors',
                item.variant === 'danger' ? 'text-red-600' : 'text-neutral-800',
              ].join(' ')}
            >
              {item.label}
            </button>
          ))}
        </div>

        <button
          type="button"
          onClick={onClose}
          className="w-full py-4 px-4 text-base font-semibold text-neutral-500 text-center active:bg-neutral-100 touch-manipulation select-none border-t-4 border-neutral-100 transition-colors"
        >
          ביטול
        </button>
      </div>
    </div>
  )
}

export default OptionsMenu
