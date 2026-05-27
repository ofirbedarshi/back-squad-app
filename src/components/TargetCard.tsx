import ListCard from './base/ListCard'
import type { OptionsMenuItem } from './base/OptionsMenu'
import type { Target } from '../domain/target.types'
import { formatMetric } from '../utils/metricRounding'
import { useTargetLiveMetrics } from '../hooks/useTargetLiveMetrics'
import { formatUpdatedAt } from '../domain/formatUpdatedAt'

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
                {formatMetric(metrics.azimuth)}
              </span>
              <span className="text-neutral-600">
                <span className="text-neutral-400 text-xs">טווח </span>
                {formatMetric(metrics.range)}
              </span>
              <span className="text-neutral-600">
                <span className="text-neutral-400 text-xs">הפרש גובה </span>
                {formatMetric(metrics.altitudeDiff)}
              </span>
            </div>
          ) : null}
        </div>
      }
      lastUpdatedAt={formatUpdatedAt(target.updatedAt)}
      onClick={onClick}
    />
  )
}

export default TargetCard
