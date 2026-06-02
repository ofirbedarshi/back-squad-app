import ListCard from './base/ListCard'
import type { OptionsMenuItem } from './base/OptionsMenu'
import type { Target } from '../domain/target.types'
import { useTargetHitProbabilityPreview } from '../hooks/useTargetHitProbabilityPreview'
import { useTargetLiveMetrics } from '../hooks/useTargetLiveMetrics'
import { formatUpdatedAt } from '../domain/formatUpdatedAt'
import TargetCardHitProbabilityPreview from './TargetCardHitProbabilityPreview'
import TargetCardLiveMetricsRow from './TargetCardLiveMetricsRow'

interface TargetCardProps {
  target: Target
  onClick: () => void
  menuItems?: OptionsMenuItem[]
}

function TargetCard({ target, onClick, menuItems }: TargetCardProps) {
  const metrics = useTargetLiveMetrics(target.coordinates, target.altitude)
  const hitProbabilityPreview = useTargetHitProbabilityPreview(target.coordinates, target.altitude)

  return (
    <ListCard
      title={target.targetName}
      menuTitle={target.targetName}
      menuItems={menuItems}
      subheader={
        <div className="flex flex-col gap-1.5">
          {metrics ? <TargetCardLiveMetricsRow metrics={metrics} /> : null}
          {hitProbabilityPreview ? (
            <TargetCardHitProbabilityPreview flightPaths={hitProbabilityPreview} />
          ) : null}
        </div>
      }
      lastUpdatedAt={formatUpdatedAt(target.updatedAt)}
      onClick={onClick}
    />
  )
}

export default TargetCard
