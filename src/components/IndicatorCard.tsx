import type { Indicator } from '../domain/indicator.types'

interface IndicatorCardProps {
  indicator: Indicator
}

function IndicatorCard({ indicator }: IndicatorCardProps) {
  return (
    <div className="bg-white rounded-2xl border border-neutral-200 shadow-sm p-4 flex flex-col gap-2">
      <div className="font-bold text-neutral-800 text-base">מציין</div>
      <div className="text-sm text-neutral-400">{indicator.savedAt}</div>
    </div>
  )
}

export default IndicatorCard
