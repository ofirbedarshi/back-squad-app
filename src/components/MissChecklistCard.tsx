import ListCard from './base/ListCard'
import type { OptionsMenuItem } from './base/OptionsMenu'
import { formatUpdatedAt } from '../domain/formatUpdatedAt'
import type { MissChecklist } from '../domain/missChecklist.types'
import { getMissChecklistCardTitle } from '../utils/missChecklistDisplay'

interface MissChecklistCardProps {
  item: MissChecklist
  onClick: () => void
  menuItems?: OptionsMenuItem[]
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
