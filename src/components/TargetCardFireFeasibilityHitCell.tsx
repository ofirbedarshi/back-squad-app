interface TargetCardFireFeasibilityHitCellProps {
  hitPercent: number | null
  showHitValues: boolean
  showHitNotImplemented: boolean
}

function TargetCardFireFeasibilityHitCell({
  hitPercent,
  showHitValues,
  showHitNotImplemented,
}: TargetCardFireFeasibilityHitCellProps) {
  if (!showHitValues && !showHitNotImplemented) {
    return null
  }

  if (showHitNotImplemented) {
    return <span className="text-[10px] text-neutral-300">—</span>
  }

  if (showHitValues && hitPercent !== null) {
    return <span className="text-[10px] font-medium tabular-nums text-neutral-800">{hitPercent}%</span>
  }

  return <span className="text-[10px] text-neutral-300">—</span>
}

export default TargetCardFireFeasibilityHitCell
