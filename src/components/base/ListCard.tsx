import { useState } from 'react'
import { useLongPressWithShake } from '../../hooks/useLongPressWithShake'
import { useSuppressNativeTextSelection } from '../../hooks/useSuppressNativeTextSelection'
import OptionsMenu from './OptionsMenu'
import type { ListCardProps } from './listCard.types'

const DEFAULT_LAST_UPDATED_LABEL = 'עודכן לאחרונה'

function ListCard({
  title,
  titleClassName,
  subheader,
  lastUpdatedAt,
  lastUpdatedLabel = DEFAULT_LAST_UPDATED_LABEL,
  className,
  onClick,
  menuTitle,
  menuItems,
}: ListCardProps) {
  const [menuOpen, setMenuOpen] = useState(false)
  const hasMenu = Boolean(menuItems?.length)
  const resolvedMenuTitle = menuTitle ?? (typeof title === 'string' ? title : undefined)

  const { className: shakeClass, ...longPressProps } = useLongPressWithShake(
    hasMenu ? () => setMenuOpen(true) : undefined,
    onClick,
  )
  const rootRef = useSuppressNativeTextSelection<HTMLDivElement>()

  return (
    <>
      <div
        ref={rootRef}
        className={[
          'interactive-no-copy bg-white rounded-2xl border border-neutral-200 shadow-sm p-4 flex flex-col gap-2 active:bg-neutral-50 transition-colors touch-manipulation',
          shakeClass,
          className,
        ]
          .filter(Boolean)
          .join(' ')}
        role="button"
        {...longPressProps}
      >
        <div className="flex items-start justify-between gap-3">
          <div className="flex-1 flex flex-col gap-1 min-w-0">
            <div
              className={[
                'font-bold text-neutral-800 text-base min-w-0',
                titleClassName,
              ]
                .filter(Boolean)
                .join(' ')}
            >
              {title}
            </div>
            {subheader ? (
              <div className="min-w-0 w-full text-sm text-neutral-500">{subheader}</div>
            ) : null}
          </div>
          {lastUpdatedAt ? (
            <div className="flex flex-col items-end shrink-0 self-start pt-0.5 gap-0.5">
              <span className="text-xs text-neutral-400">{lastUpdatedLabel}</span>
              <span className="text-xs text-neutral-400 tabular-nums">{lastUpdatedAt}</span>
            </div>
          ) : null}
        </div>
      </div>

      {menuOpen && menuItems ? (
        <OptionsMenu title={resolvedMenuTitle} items={menuItems} onClose={() => setMenuOpen(false)} />
      ) : null}
    </>
  )
}

export default ListCard
