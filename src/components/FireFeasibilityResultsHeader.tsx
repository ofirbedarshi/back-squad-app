interface FireFeasibilityResultsHeaderProps {
  positionName: string
  targetName: string
}

function FireFeasibilityResultsHeader({
  positionName,
  targetName,
}: FireFeasibilityResultsHeaderProps) {
  return (
    <div className="grid grid-cols-2 gap-3 rounded-xl border border-neutral-200 bg-white px-4 py-3 text-sm">
      <div className="flex flex-col gap-0.5 text-end">
        <span className="font-medium text-neutral-500">שם עמדה</span>
        <span className="font-semibold text-neutral-800">{positionName}</span>
      </div>
      <div className="flex flex-col gap-0.5 text-end">
        <span className="font-medium text-neutral-500">שם מטרה</span>
        <span className="font-semibold text-neutral-800">{targetName}</span>
      </div>
    </div>
  )
}

export default FireFeasibilityResultsHeader
