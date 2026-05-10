import type { NoteAddTriggerLayout } from './noteAddTrigger.types'

interface NoteAddTriggerButtonProps {
  layout: NoteAddTriggerLayout
  onClick: () => void
}

const LAYOUT_CLASS: Record<NoteAddTriggerLayout, string> = {
  header:
    'py-2 px-3 rounded-xl border-2 border-dashed border-neutral-300 text-neutral-600 font-semibold text-sm active:bg-neutral-100 transition-colors touch-manipulation select-none max-w-[11rem] leading-tight',
  listRow:
    'w-full py-4 rounded-2xl border-2 border-dashed border-neutral-300 text-neutral-600 font-semibold text-base active:bg-neutral-100 transition-colors touch-manipulation select-none',
}

function NoteAddTriggerButton({ layout, onClick }: NoteAddTriggerButtonProps) {
  return (
    <button type="button" onClick={onClick} className={LAYOUT_CLASS[layout]}>
      + הוסף הערה
    </button>
  )
}

export default NoteAddTriggerButton
