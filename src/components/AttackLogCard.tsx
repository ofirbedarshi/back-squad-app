import ListCard from './base/ListCard'
import type { OptionsMenuItem } from './base/OptionsMenu'
import AttackLogStatusBadge from './AttackLogStatusBadge'
import { formatUpdatedAt } from '../domain/formatUpdatedAt'
import type { AttackLog } from '../domain/attackLog.types'

interface AttackLogCardProps {
  log: AttackLog
  onClick: () => void
  menuItems?: OptionsMenuItem[]
}

function AttackLogCard({ log, onClick, menuItems }: AttackLogCardProps) {
  const dateTimeLine = [log.date, log.time].filter(Boolean).join(' | ')
  const menuTitle = log.targetName.trim() || 'תקיפה'

  return (
    <ListCard
      title={`מטרה: ${log.targetName}`}
      menuTitle={menuTitle}
      menuItems={menuItems}
      subheader={
        <div className="flex flex-col gap-2">
          <AttackLogStatusBadge wasAttacked={log.wasAttacked ?? 'no'} hit={log.hit ?? false} />
          {dateTimeLine ? <span>{dateTimeLine}</span> : null}
        </div>
      }
      lastUpdatedAt={formatUpdatedAt(log.updatedAt)}
      onClick={onClick}
    />
  )
}

export default AttackLogCard
