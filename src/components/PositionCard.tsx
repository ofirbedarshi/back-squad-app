import ListCard from './base/ListCard'
import type { OptionsMenuItem } from './base/OptionsMenu'
import type { Position } from '../domain/position.types'
import { formatUpdatedAt } from '../domain/formatUpdatedAt'

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
  onClick: () => void
  menuItems?: OptionsMenuItem[]
}

function getPositionCardClassName(
  selected: boolean,
  isCurrent: boolean,
  emphasizeCurrent: boolean,
): string | undefined {
  if (selected) {
    return 'border-2 border-blue-500 ring-2 ring-blue-400/40'
  }
  if (isCurrent && emphasizeCurrent) {
    return 'border-emerald-400 ring-1 ring-emerald-200'
  }
  return undefined
}

function PositionCard({
  position,
  isCurrent = false,
  emphasizeCurrent = true,
  selected = false,
  onClick,
  menuItems,
}: PositionCardProps) {
  const { east, north } = position.coordinates

  return (
    <ListCard
      className={getPositionCardClassName(selected, isCurrent, emphasizeCurrent)}
      title={
        <div className="flex items-center justify-between gap-2 w-full">
          <span className="truncate">{position.stationName}</span>
          {isCurrent ? (
            <span className="shrink-0 text-xs font-semibold bg-emerald-100 text-emerald-800 px-2 py-0.5 rounded-full">
              עמדה נוכחית
            </span>
          ) : null}
        </div>
      }
      menuTitle={position.stationName}
      menuItems={menuItems}
      subheader={
        <span>
          נ"צ: {east}/{north} | גובה: {position.altitude} מ'
        </span>
      }
      lastUpdatedAt={formatUpdatedAt(position.updatedAt)}
      onClick={onClick}
    />
  )
}

export default PositionCard
