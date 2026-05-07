import { useMemo } from 'react'
import { useCurrentPosition } from '../hooks/useCurrentPosition'
import { calculateTargetLiveMetricsUseCase } from '../useCases/calculateTargetLiveMetrics'
import type { Target } from '../domain/target.types'

interface TargetCardProps {
  target: Target
  onClick?: () => void
}

function TargetCard({ target, onClick }: TargetCardProps) {
  const currentPosition = useCurrentPosition()
  const liveMetrics = useMemo(
    () =>
      calculateTargetLiveMetricsUseCase({
        targetCoordinates: target.coordinates,
        targetHeight: target.altitude,
      }),
    [currentPosition, target.coordinates, target.altitude]
  )

  const displayAzimuth = liveMetrics ? liveMetrics.azimuth.toFixed(1) : '-'
  const displayRange = liveMetrics ? liveMetrics.range.toFixed(1) : '-'
  const displayAltitudeDiff = liveMetrics ? liveMetrics.altitudeDiff.toFixed(1) : '-'

  return (
    <div
      className="bg-white rounded-2xl border border-neutral-200 shadow-sm p-4 flex flex-col gap-2 active:bg-neutral-50 transition-colors touch-manipulation select-none"
      onClick={onClick}
      role={onClick ? 'button' : undefined}
    >
      <div className="flex items-center justify-between gap-3">
        <span className="font-bold text-neutral-800 text-base">מטרה {target.targetName}</span>
      </div>
      <div className="text-sm text-neutral-500 flex flex-col gap-1">
        <span>אזימוט: {displayAzimuth}</span>
        <span>טווח: {displayRange}</span>
        <span>הפרש גובה: {displayAltitudeDiff}</span>
      </div>
    </div>
  )
}

export default TargetCard
