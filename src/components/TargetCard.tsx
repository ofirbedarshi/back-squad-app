import type { Target } from './target.types'

interface TargetCardProps {
  target: Target
  onClick?: () => void
}

function TargetCard({ target, onClick }: TargetCardProps) {
  return (
    <div
      className="bg-white rounded-2xl border border-neutral-200 shadow-sm p-4 flex flex-col gap-2 active:bg-neutral-50 transition-colors touch-manipulation select-none"
      onClick={onClick}
      role={onClick ? 'button' : undefined}
    >
      <div className="flex items-center justify-between gap-3">
        <span className="font-bold text-neutral-800 text-base">מטרה {target.targetName}</span>
      </div>
      <span className="text-sm text-neutral-500">נ.צ: {target.coordinates}</span>
    </div>
  )
}

export default TargetCard
