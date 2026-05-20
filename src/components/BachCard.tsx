import ListCard from './base/ListCard'
import type { OptionsMenuItem } from './base/OptionsMenu'
import { formatUpdatedAt } from '../domain/formatUpdatedAt'
import type { Bach } from '../domain/bach.types'

interface BachCardProps {
  bach: Bach
  onClick: () => void
  menuItems?: OptionsMenuItem[]
}

function getBachCardTitle(bach: Bach): { title: string; menuTitle: string } {
  const { values } = bach
  const targetName = typeof values.targetName === 'string' ? values.targetName.trim() : ''
  const indicatorName = typeof values.indicatorName === 'string' ? values.indicatorName.trim() : ''
  const title = targetName ? `מטרה: ${targetName}` : 'ללא שם מטרה'
  const menuTitle = targetName || indicatorName || 'בדח'
  return { title, menuTitle }
}

function BachCard({ bach, onClick, menuItems }: BachCardProps) {
  const { values } = bach
  const indicatorName = typeof values.indicatorName === 'string' ? values.indicatorName : ''
  const date = typeof values.date === 'string' ? values.date : ''
  const hour = typeof values.hour === 'string' ? values.hour : ''
  const { title, menuTitle } = getBachCardTitle(bach)
  const hasSubheader = Boolean(indicatorName || date || hour)

  return (
    <ListCard
      title={title}
      menuTitle={menuTitle}
      menuItems={menuItems}
      subheader={
        hasSubheader ? (
          <div className="flex flex-col gap-1">
            {indicatorName ? <span>מציין: {indicatorName}</span> : null}
            {date || hour ? <span>{[date, hour].filter(Boolean).join(' | ')}</span> : null}
          </div>
        ) : undefined
      }
      lastUpdatedAt={formatUpdatedAt(bach.updatedAt)}
      onClick={onClick}
    />
  )
}

export default BachCard
