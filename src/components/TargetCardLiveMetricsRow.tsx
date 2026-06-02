import type { TargetLiveMetrics } from '../domain/targetLiveMetrics.types'
import { formatMetric } from '../utils/metricRounding'

interface TargetCardLiveMetricsRowProps {
  metrics: TargetLiveMetrics
}

function TargetCardLiveMetricsRow({ metrics }: TargetCardLiveMetricsRowProps) {
  return (
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
  )
}

export default TargetCardLiveMetricsRow
