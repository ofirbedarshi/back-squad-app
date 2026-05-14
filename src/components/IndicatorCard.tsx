import { useLongPressWithShake } from '../hooks/useLongPressWithShake'
import { useSuppressNativeTextSelection } from '../hooks/useSuppressNativeTextSelection'
import type { Indicator } from '../domain/indicator.types'

interface IndicatorCardProps {
  indicator: Indicator
  onClick: () => void
  onLongPress: () => void
}

function IndicatorCard({ indicator, onClick, onLongPress }: IndicatorCardProps) {
  const { className: shakeClass, ...longPressProps } = useLongPressWithShake(onLongPress, onClick)
  const rootRef = useSuppressNativeTextSelection<HTMLDivElement>()

  return (
    <div
      ref={rootRef}
      className={`interactive-no-copy bg-white rounded-2xl border border-neutral-200 shadow-sm p-4 flex flex-col gap-2 active:bg-neutral-50 transition-colors touch-manipulation ${shakeClass}`}
      role="button"
      {...longPressProps}
    >
      <div className="font-bold text-neutral-800 text-base">{indicator.indicatorName}</div>
      <div className="flex flex-col gap-1 text-sm text-neutral-500">
        <span>נ"צ: {indicator.coordinates.east}/{indicator.coordinates.north}</span>
        <span>גובה: {indicator.altitude} מ'</span>
        <span>אמצעי: {indicator.means}</span>
        <span>קוד ציון: {indicator.markCode}</span>
        {indicator.targetDomain && <span>תחום מטרות: {indicator.targetDomain}</span>}
      </div>
    </div>
  )
}

export default IndicatorCard
