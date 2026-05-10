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
}

function PositionCard({
  position,
  isCurrent = false,
  emphasizeCurrent = true,
  selected = false,
  onClick,
}: PositionCardProps) {
  const east = typeof position.coordinates === 'object' ? position.coordinates.east : String(position.coordinates ?? '')
  const north = typeof position.coordinates === 'object' ? position.coordinates.north : ''

  const borderClass = selected
    ? 'border-2 border-blue-500 ring-2 ring-blue-400/40'
    : isCurrent && emphasizeCurrent
      ? 'border-emerald-400 ring-1 ring-emerald-200'
      : 'border-neutral-200'

  return (
    <div
      className={`bg-white rounded-2xl border shadow-sm p-3 flex flex-col gap-1.5 active:bg-neutral-50 transition-colors touch-manipulation select-none ${borderClass}`}
      onClick={onClick}
      role={onClick ? 'button' : undefined}
    >
      <div className="flex items-center justify-between gap-2">
        <div className="font-bold text-neutral-800 text-base">{position.stationName}</div>
        {isCurrent && (
          <span className="text-xs font-semibold bg-emerald-100 text-emerald-800 px-2 py-1 rounded-full">עמדה נוכחית</span>
        )}
      </div>
      <div className="flex flex-col gap-1 text-sm text-neutral-500">
        <span>נ"צ: {east}{north ? ` / ${north}` : ''}</span>
        <span>גובה: {position.altitude} מ'</span>
      </div>
    </div>
  )
}

export default PositionCard
