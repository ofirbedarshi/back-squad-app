import ListCard from './base/ListCard'
import type { OptionsMenuItem } from './base/OptionsMenu'
import type { Target } from '../domain/target.types'
import { useTargetLiveMetrics } from '../hooks/useTargetLiveMetrics'

interface TargetCardProps {
  target: Target
  onClick: () => void
  menuItems?: OptionsMenuItem[]
}

function TargetCard({ target, onClick, menuItems }: TargetCardProps) {
  const metrics = useTargetLiveMetrics(target.coordinates, target.altitude)

  return (
    <ListCard
      title={target.targetName}
      menuTitle={target.targetName}
      menuItems={menuItems}
      subheader={
        <div className="flex flex-col gap-1.5">
          <span className="font-mono text-neutral-400">
            {target.coordinates.east}/{target.coordinates.north}
          </span>
          {metrics ? (
            <div className="flex gap-3">
              <span className="text-neutral-600">
                <span className="text-neutral-400 text-xs">אזימוט </span>
                {metrics.azimuth.toFixed(1)}
              </span>
              <span className="text-neutral-600">
                <span className="text-neutral-400 text-xs">טווח </span>
                {metrics.range.toFixed(1)}
              </span>
              <span className="text-neutral-600">
                <span className="text-neutral-400 text-xs">הפרש גובה </span>
                {metrics.altitudeDiff.toFixed(1)}
              </span>
            </div>
          ) : null}
        </div>
      }
      onClick={onClick}
    />
  )
}

export default TargetCard
