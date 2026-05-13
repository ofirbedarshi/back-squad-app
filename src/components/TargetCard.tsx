import { useLongPressWithShake } from '../hooks/useLongPressWithShake'
import { useTargetLiveMetrics } from '../hooks/useTargetLiveMetrics'
import type { Target } from '../domain/target.types'

interface TargetCardProps {
  target: Target
  onClick: () => void
  onLongPress: () => void
}

function TargetCard({ target, onClick, onLongPress }: TargetCardProps) {
  const { className: shakeClass, ...longPressProps } = useLongPressWithShake(onLongPress, onClick)

  const metrics = useTargetLiveMetrics(target.coordinates, target.altitude)

  return (
    <div
      className={`bg-white rounded-2xl border border-neutral-200 shadow-sm p-4 flex flex-col gap-1.5 active:bg-neutral-50 transition-colors touch-manipulation select-none ${shakeClass}`}
      role="button"
      {...longPressProps}
    >
      <span className="font-bold text-neutral-800 text-base">{target.targetName}</span>
      <span className="text-sm text-neutral-400 font-mono">
        {target.coordinates.east} / {target.coordinates.north}
      </span>
      {metrics && (
        <div className="flex gap-3 mt-0.5">
          <span className="text-sm text-neutral-600">
            <span className="text-neutral-400 text-xs">אזימוט </span>
            {metrics.azimuth.toFixed(1)}
          </span>
          <span className="text-sm text-neutral-600">
            <span className="text-neutral-400 text-xs">טווח </span>
            {metrics.range.toFixed(1)}
          </span>
          <span className="text-sm text-neutral-600">
            <span className="text-neutral-400 text-xs">הפרש גובה </span>
            {metrics.altitudeDiff.toFixed(1)}
          </span>
        </div>
      )}
    </div>
  )
}

export default TargetCard
