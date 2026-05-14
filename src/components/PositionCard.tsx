import { useLongPressWithShake } from '../hooks/useLongPressWithShake'
import { useSuppressNativeTextSelection } from '../hooks/useSuppressNativeTextSelection'
import type { Position } from '../domain/position.types'

interface PositionCardProps {
  position: Position
  isCurrent?: boolean
  /**
   * When false, omits the green border/ring for the current station (e.g. reference picker).
   * The "עמדה נוכחית" label still shows when isCurrent is true.
   */
  emphasizeCurrent?: boolean
  /** Draft / list selection (e.g. reference picker) — blue frame on the card itself. */
  selected?: boolean
  onClick?: () => void
  onLongPress?: () => void
}

function PositionCard({
  position,
  isCurrent = false,
  emphasizeCurrent = true,
  selected = false,
  onClick,
  onLongPress,
}: PositionCardProps) {
  const east = position.coordinates.east
  const north = position.coordinates.north

  const borderClass = selected
    ? 'border-2 border-blue-500 ring-2 ring-blue-400/40'
    : isCurrent && emphasizeCurrent
      ? 'border-emerald-400 ring-1 ring-emerald-200'
      : 'border-neutral-200 border-r-2 border-r-blue-400/60'

  const { className: shakeClass, ...longPressHandlers } = useLongPressWithShake(onLongPress, onClick)

  const rootRef = useSuppressNativeTextSelection<HTMLDivElement>()

  const interactiveProps = onLongPress
    ? {
        role: 'button' as const,
        className: `interactive-no-copy bg-white rounded-xl border shadow-sm px-3 py-2.5 flex flex-col gap-1 active:bg-neutral-50 transition-colors touch-manipulation ${borderClass} ${shakeClass}`,
        ...longPressHandlers,
      }
    : {
        role: onClick ? ('button' as const) : undefined,
        className: `interactive-no-copy bg-white rounded-xl border shadow-sm px-3 py-2.5 flex flex-col gap-1 active:bg-neutral-50 transition-colors touch-manipulation ${borderClass}`,
        onClick,
      }

  return (
    <div ref={rootRef} {...interactiveProps}>
      <div className="flex items-center justify-between gap-2">
        <div className="font-semibold text-neutral-800 text-sm">{position.stationName}</div>
        {isCurrent && (
          <span className="text-xs font-semibold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full">עמדה נוכחית</span>
        )}
      </div>
      <div className="text-xs text-neutral-500">
        נ"צ: {east}{north ? ` / ${north}` : ''} | גובה: {position.altitude} מ'
      </div>
    </div>
  )
}

export default PositionCard
