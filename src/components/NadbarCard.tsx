import { useLongPressWithShake } from '../hooks/useLongPressWithShake'
import { useSuppressNativeTextSelection } from '../hooks/useSuppressNativeTextSelection'
import type { Nadbar } from '../domain/nadbar.types'
import { getNadbarCardSubtitle, getNadbarCardTitle } from '../utils/nadbarDisplay'

interface NadbarCardProps {
  nadbar: Nadbar
  onClick: () => void
  onLongPress: () => void
}

function NadbarCard({ nadbar, onClick, onLongPress }: NadbarCardProps) {
  const { className: shakeClass, ...longPressProps } = useLongPressWithShake(onLongPress, onClick)
  const rootRef = useSuppressNativeTextSelection<HTMLDivElement>()

  return (
    <div
      ref={rootRef}
      className={`interactive-no-copy bg-white rounded-2xl border border-neutral-200 shadow-sm p-4 flex flex-col gap-2 active:bg-neutral-50 transition-colors touch-manipulation ${shakeClass}`}
      role="button"
      {...longPressProps}
    >
      <div className="font-bold text-neutral-800 text-base">{getNadbarCardTitle(nadbar)}</div>
      <div className="text-sm text-neutral-500">{getNadbarCardSubtitle(nadbar)}</div>
    </div>
  )
}

export default NadbarCard
