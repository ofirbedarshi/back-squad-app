import ListCard from './base/ListCard'
import type { OptionsMenuItem } from './base/OptionsMenu'
import type { Indicator } from '../domain/indicator.types'

interface IndicatorCardProps {
  indicator: Indicator
  onClick: () => void
  menuItems?: OptionsMenuItem[]
}

function IndicatorCard({ indicator, onClick, menuItems }: IndicatorCardProps) {
  return (
    <ListCard
      title={indicator.indicatorName}
      menuTitle={indicator.indicatorName}
      menuItems={menuItems}
      subheader={
        <div className="flex flex-col gap-1">
          <span>
            נ"צ: {indicator.coordinates.east}/{indicator.coordinates.north}
          </span>
          <span>גובה: {indicator.altitude} מ'</span>
          <span>אמצעי: {indicator.means}</span>
          <span>קוד ציון: {indicator.markCode}</span>
          {indicator.targetDomain ? <span>תחום מטרות: {indicator.targetDomain}</span> : null}
        </div>
      }
      onClick={onClick}
    />
  )
}

export default IndicatorCard
