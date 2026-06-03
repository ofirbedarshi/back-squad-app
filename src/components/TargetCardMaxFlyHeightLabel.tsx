import { formatMetric } from '../utils/metricRounding'

interface TargetCardMaxFlyHeightLabelProps {
  maxFlyHeightMeters: number
}

function TargetCardMaxFlyHeightLabel({ maxFlyHeightMeters }: TargetCardMaxFlyHeightLabelProps) {
  return (
    <div className="flex flex-wrap items-baseline gap-x-1.5 gap-y-0 text-[11px] leading-tight">
      <span className="font-semibold text-neutral-500">גובה מעוף מקסימלי</span>
      <span className="font-semibold tabular-nums text-neutral-800">
        {formatMetric(maxFlyHeightMeters)} מ׳
      </span>
    </div>
  )
}

export default TargetCardMaxFlyHeightLabel
