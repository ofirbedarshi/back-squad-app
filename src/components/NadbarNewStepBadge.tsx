interface NadbarNewStepBadgeProps {
  stepNumber: number
  totalSteps: number
}

function NadbarNewStepBadge({ stepNumber, totalSteps }: NadbarNewStepBadgeProps) {
  return (
    <p className="text-center text-xs text-neutral-500 py-2 bg-white border-b border-neutral-100">
      שלב {stepNumber} מתוך {totalSteps}
    </p>
  )
}

export default NadbarNewStepBadge
