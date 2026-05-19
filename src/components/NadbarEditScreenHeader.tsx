import NadbarLinksToolbar from './NadbarLinksToolbar'
import type { Nadbar, NadbarLinksUpdate } from '../domain/nadbar.types'
import { getNadbarCardTitle } from '../utils/nadbarDisplay'

interface NadbarEditScreenHeaderProps {
  draftNadbar: Nadbar
  onBack: () => void
  onLinksChange: (links: NadbarLinksUpdate) => void
  onSave: () => void
}

function NadbarEditScreenHeader({ draftNadbar, onBack, onLinksChange, onSave }: NadbarEditScreenHeaderProps) {
  return (
    <header className="sticky top-0 z-10 bg-white px-4 py-3 flex items-center gap-2 border-b border-neutral-200 shrink-0">
      <button
        type="button"
        onClick={onBack}
        className="text-sm font-semibold text-blue-600 active:opacity-70 touch-manipulation shrink-0"
      >
        חזור
      </button>
      <span className="flex-1 text-center font-bold text-lg text-neutral-800 truncate px-1 min-w-0">
        {getNadbarCardTitle(draftNadbar)}
      </span>
      <div className="flex items-center gap-1 shrink-0">
        <NadbarLinksToolbar
          replaceMode
          pointerId={draftNadbar.links?.pointerId}
          targetId={draftNadbar.links?.targetId}
          positionId={draftNadbar.links?.positionId}
          onLinksChange={onLinksChange}
        />
        <button
          type="button"
          onClick={onSave}
          className="text-sm font-bold text-white bg-blue-600 rounded-xl px-3 py-1.5 active:bg-blue-700 touch-manipulation"
        >
          שמור
        </button>
      </div>
    </header>
  )
}

export default NadbarEditScreenHeader
