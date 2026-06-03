import ListHeaderAddButton from './base/ListHeaderAddButton'
import type { NoteAddTriggerLayout } from './noteAddTrigger.types'

interface NoteAddTriggerButtonProps {
  layout: NoteAddTriggerLayout
  onClick: () => void
}

const LIST_ROW_CLASS =
  'w-full py-4 rounded-2xl border-2 border-dashed border-neutral-300 text-neutral-600 font-semibold text-base active:bg-neutral-100 transition-colors touch-manipulation select-none'

function NoteAddTriggerButton({ layout, onClick }: NoteAddTriggerButtonProps) {
  if (layout === 'header') {
    return <ListHeaderAddButton label="+ הוסף הערה" onClick={onClick} />
  }

  return (
    <button type="button" onClick={onClick} className={LIST_ROW_CLASS}>
      + הוסף הערה
    </button>
  )
}

export default NoteAddTriggerButton
