import ListCard from './base/ListCard'
import type { OptionsMenuItem } from './base/OptionsMenu'
import { formatUpdatedAt } from '../domain/formatUpdatedAt'
import type { TargetAid } from '../domain/targetAid.types'

interface TargetAidCardProps {
  item: TargetAid
  onClick: () => void
  menuItems?: OptionsMenuItem[]
}

function getTargetAidCardTitle(item: TargetAid): { title: string; menuTitle: string } {
  const targetNumber =
    typeof item.values.targetNumber === 'string' ? item.values.targetNumber.trim() : ''
  const fallback = 'עזר מטרות למפקד משימה'
  return {
    title: targetNumber ? `שם מטרה: ${targetNumber}` : fallback,
    menuTitle: targetNumber || fallback,
  }
}

function TargetAidCard({ item, onClick, menuItems }: TargetAidCardProps) {
  const { title, menuTitle } = getTargetAidCardTitle(item)

  return (
    <ListCard
      title={title}
      menuTitle={menuTitle}
      menuItems={menuItems}
      lastUpdatedAt={formatUpdatedAt(item.updatedAt)}
      onClick={onClick}
    />
  )
}

export default TargetAidCard
