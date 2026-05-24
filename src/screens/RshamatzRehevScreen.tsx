import { useEffect, useMemo, useState } from 'react'
import RshamatzChecklistSection from '../components/RshamatzChecklistSection'
import { useConfirm } from '../hooks/useConfirm'
import { clearRshamatzRehevChecklistUseCase } from '../useCases/clearRshamatzRehevChecklist'
import { loadRshamatzRehevChecklistUseCase } from '../useCases/loadRshamatzRehevChecklist'
import { saveRshamatzRehevChecklistUseCase } from '../useCases/saveRshamatzRehevChecklist'
import { toggleRshamatzRehevChecklistItemUseCase } from '../useCases/toggleRshamatzRehevChecklistItem'
import type { RshamatzRehevChecklistState } from '../domain/rshamatzRehevChecklist.types'
import { debounce } from '../utils/debounce'
import { RSHAMATZ_REHEV_CHECKLIST_SECTIONS } from './rshamatzRehevChecklist.data'

const NOTES_SAVE_DEBOUNCE_MS = 400

function RshamatzRehevScreen() {
  const confirm = useConfirm()
  const [state, setState] = useState(() => loadRshamatzRehevChecklistUseCase())

  const debouncedSaveNotes = useMemo(
    () =>
      debounce((snapshot: RshamatzRehevChecklistState) => {
        saveRshamatzRehevChecklistUseCase(snapshot)
      }, NOTES_SAVE_DEBOUNCE_MS),
    []
  )

  useEffect(() => () => debouncedSaveNotes.cancel(), [debouncedSaveNotes])

  function handleToggle(id: string) {
    setState((prev) => toggleRshamatzRehevChecklistItemUseCase(id, prev))
  }

  function handleNotesChange(notes: string) {
    setState((prev) => {
      const next = { ...prev, notes }
      debouncedSaveNotes(next)
      return next
    })
  }

  async function handleClearAll() {
    const confirmed = await confirm({
      title: 'ניקוי רשמ"צ רכב',
      message: 'למחוק את כל הסימונים וההערות? לא ניתן לשחזר.',
      confirmLabel: 'נקה הכל',
      cancelLabel: 'ביטול',
      variant: 'danger',
    })
    if (!confirmed) return

    debouncedSaveNotes.cancel()
    setState(clearRshamatzRehevChecklistUseCase())
  }

  return (
    <div dir="rtl" className="flex flex-col h-full">
      <header className="sticky top-0 z-10 bg-white py-4 px-4 flex items-center justify-between border-b border-neutral-200 text-neutral-800 shrink-0">
        <span className="w-[4.5rem]" aria-hidden />
        <span className="flex-1 text-center font-bold text-lg">רשמ"צ רכב</span>
        <button
          type="button"
          onClick={() => void handleClearAll()}
          className="text-xs text-red-600 border border-red-200 rounded-lg px-2.5 py-1.5 font-medium active:bg-red-50 touch-manipulation shrink-0"
        >
          נקה הכל
        </button>
      </header>

      <div className="flex-1 overflow-y-auto flex flex-col gap-6 p-4 pb-8">
        {RSHAMATZ_REHEV_CHECKLIST_SECTIONS.map((section) => (
          <RshamatzChecklistSection
            key={section.id}
            section={section}
            checked={state.checked}
            onToggle={handleToggle}
          />
        ))}

        <section className="flex flex-col gap-2">
          <label htmlFor="rshamatz-rehev-notes" className="font-bold text-neutral-900 text-base">
            הערות:
          </label>
          <textarea
            id="rshamatz-rehev-notes"
            value={state.notes}
            onChange={(e) => handleNotesChange(e.target.value)}
            rows={4}
            className="w-full rounded-lg border border-neutral-300 bg-neutral-200/60 px-3 py-3 text-base text-neutral-900 placeholder:text-neutral-500 focus:outline-none focus:border-neutral-400 focus:bg-neutral-100 resize-y min-h-[96px]"
            placeholder=""
          />
        </section>
      </div>
    </div>
  )
}

export default RshamatzRehevScreen
