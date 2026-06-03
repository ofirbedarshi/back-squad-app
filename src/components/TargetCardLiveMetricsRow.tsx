import type { TargetLiveMetrics } from '../domain/targetLiveMetrics.types'
import { formatMetric } from '../utils/metricRounding'

interface TargetCardLiveMetricsRowProps {
  metrics: TargetLiveMetrics
}

const METRIC_FIELDS = [
  { label: 'אזימוט', value: (m: TargetLiveMetrics) => formatMetric(m.azimuth) },
  { label: 'טווח', value: (m: TargetLiveMetrics) => formatMetric(m.range) },
  { label: 'הפרש גובה', value: (m: TargetLiveMetrics) => formatMetric(m.altitudeDiff) },
] as const

function TargetCardLiveMetricsRow({ metrics }: TargetCardLiveMetricsRowProps) {
  return (
    <div className="w-[4.75rem] shrink-0 rounded-md bg-neutral-50 px-1.5 py-1">
      <div className="flex flex-col gap-1">
        {METRIC_FIELDS.map((field) => (
          <div key={field.label} className="flex min-w-0 flex-col gap-px">
            <span className="text-[9px] leading-none text-neutral-400">{field.label}</span>
            <span className="text-[10px] font-semibold tabular-nums leading-tight text-neutral-800">
              {field.value(metrics)}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default TargetCardLiveMetricsRow
