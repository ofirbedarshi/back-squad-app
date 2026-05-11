import type { Target } from '../domain/target.types'

interface TargetCardProps {
  target: Target
  onClick?: () => void
}

function TargetCard({ target, onClick }: TargetCardProps) {
  return (
    <div
      className="bg-white rounded-2xl border border-neutral-200 shadow-sm p-4 flex flex-col gap-1.5 active:bg-neutral-50 transition-colors touch-manipulation select-none"
      onClick={onClick}
      role={onClick ? 'button' : undefined}
    >
      <span className="font-bold text-neutral-800 text-base">{target.targetName}</span>
      {target.targetDescription && (
        <span className="text-sm text-neutral-500">{target.targetDescription}</span>
      )}
      <span className="text-sm text-neutral-400 font-mono">
        {target.coordinates.east} / {target.coordinates.north}
      </span>
    </div>
  )
}

export default TargetCard
