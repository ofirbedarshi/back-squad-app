import ListCard from './base/ListCard'
import type { OptionsMenuItem } from './base/OptionsMenu'
import type { Target } from '../domain/target.types'
import { useTargetCloudsFeasibilityPreview } from '../hooks/useTargetCloudsFeasibilityPreview'
import { useTargetHitProbabilityPreview } from '../hooks/useTargetHitProbabilityPreview'
import { useTargetLiveMetrics } from '../hooks/useTargetLiveMetrics'
import { formatUpdatedAt } from '../domain/formatUpdatedAt'
import TargetCardFireFeasibilityPreview from './TargetCardFireFeasibilityPreview'
import TargetCardLiveMetricsRow from './TargetCardLiveMetricsRow'

interface TargetCardProps {
  target: Target
  onClick: () => void
  menuItems?: OptionsMenuItem[]
}

function TargetCard({ target, onClick, menuItems }: TargetCardProps) {
  const metrics = useTargetLiveMetrics(target.coordinates, target.altitude)
  const hitProbabilityPreview = useTargetHitProbabilityPreview(target.coordinates, target.altitude)
  const cloudsFeasibilityPreview = useTargetCloudsFeasibilityPreview(
    target.coordinates,
    target.altitude,
  )

  return (
    <ListCard
      title={target.targetName}
      titleClassName="line-clamp-2 leading-snug"
      className="gap-1.5 p-3"
      menuTitle={target.targetName}
      menuItems={menuItems}
      subheader={
        metrics || hitProbabilityPreview || cloudsFeasibilityPreview ? (
          <div className="grid w-full min-w-0 grid-cols-[auto_1fr] items-start gap-1.5">
            {metrics ? <TargetCardLiveMetricsRow metrics={metrics} /> : null}
            {hitProbabilityPreview || cloudsFeasibilityPreview ? (
              <TargetCardFireFeasibilityPreview
                hitProbability={hitProbabilityPreview}
                clouds={cloudsFeasibilityPreview}
              />
            ) : null}
          </div>
        ) : null
      }
      lastUpdatedAt={formatUpdatedAt(target.updatedAt)}
      onClick={onClick}
    />
  )
}

export default TargetCard
