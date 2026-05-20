import ListCard from './base/ListCard'
import type { OptionsMenuItem } from './base/OptionsMenu'
import { formatUpdatedAt } from '../domain/formatUpdatedAt'
import type { MissChecklist } from '../domain/missChecklist.types'

interface MissChecklistCardProps {
  item: MissChecklist
  onClick: () => void
  menuItems?: OptionsMenuItem[]
}

function getMissChecklistCardTitle(item: MissChecklist): { title: string; menuTitle: string } {
  const targetType =
    typeof item.values.targetType === 'string' ? item.values.targetType.trim() : ''
  const fallback = "צ'קליסט החטאה"
  return {
    title: targetType ? `סוג מטרה: ${targetType}` : fallback,
    menuTitle: targetType || fallback,
  }
}

function MissChecklistCard({ item, onClick, menuItems }: MissChecklistCardProps) {
  const { title, menuTitle } = getMissChecklistCardTitle(item)

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

export default MissChecklistCard
