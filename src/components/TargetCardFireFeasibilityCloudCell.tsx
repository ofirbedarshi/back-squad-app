import type { CloudsFeasibilityFlightPathCellResult } from '../useCases/buildCloudsFeasibilityFlightPathResultsByGeneration.types'

interface TargetCardFireFeasibilityCloudCellProps {
  cloudCell: CloudsFeasibilityFlightPathCellResult | null
}

function TargetCardFireFeasibilityCloudCell({ cloudCell }: TargetCardFireFeasibilityCloudCellProps) {
  if (!cloudCell) {
    return null
  }

  if (cloudCell.enabled) {
    return (
      <span
        aria-label="מאפשר"
        className="inline-flex h-3.5 w-3.5 items-center justify-center text-[11px] font-bold leading-none text-emerald-600"
      >
        ✓
      </span>
    )
  }

  return (
    <span
      aria-label="לא מאפשר"
      className="inline-flex h-3.5 w-3.5 items-center justify-center text-[11px] font-bold leading-none text-red-600"
    >
      ✕
    </span>
  )
}

export default TargetCardFireFeasibilityCloudCell
