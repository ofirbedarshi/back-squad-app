import type { CloudsFeasibilityFlightPathCellResult } from '../useCases/buildCloudsFeasibilityFlightPathResultsByGeneration.types'

interface TargetCardFireFeasibilityFlightPathRowProps {
  flightPathLabel: string
  hitPercent: number | null
  cloudCell: CloudsFeasibilityFlightPathCellResult | null
}

function TargetCardFireFeasibilityFlightPathRow({
  flightPathLabel,
  hitPercent,
  cloudCell,
}: TargetCardFireFeasibilityFlightPathRowProps) {
  const showHit = hitPercent !== null
  const showCloud = cloudCell !== null

  const cloudStatusLabel = cloudCell ? (cloudCell.enabled ? 'מאפשר' : 'לא') : null
  const cloudStatusClass = cloudCell?.enabled ? 'text-emerald-700' : 'text-red-700'

  return (
    <li className="flex items-center justify-between gap-1 text-[11px] leading-tight text-neutral-800">
      <span className="w-7 shrink-0 font-semibold">{flightPathLabel}</span>
      <div className="flex min-w-0 flex-1 items-center justify-end gap-1.5 tabular-nums">
        {showHit ? <span className="w-8 text-end font-medium">{hitPercent}%</span> : null}
        {cloudStatusLabel ? (
          <span className={`w-8 text-end font-bold ${cloudStatusClass}`}>{cloudStatusLabel}</span>
        ) : null}
      </div>
    </li>
  )
}

export default TargetCardFireFeasibilityFlightPathRow
