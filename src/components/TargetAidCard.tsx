import ListCard from './base/ListCard'
import type { OptionsMenuItem } from './base/OptionsMenu'
import { formatUpdatedAt } from '../domain/formatUpdatedAt'
import type { TargetAid } from '../domain/targetAid.types'
import { getTargetAidCardTitle } from '../utils/targetAidDisplay'

interface TargetAidCardProps {
  item: TargetAid
  onClick: () => void
  menuItems?: OptionsMenuItem[]
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
