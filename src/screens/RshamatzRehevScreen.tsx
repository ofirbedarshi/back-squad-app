import { useState } from 'react'
import RshamatzChecklistSection from '../components/RshamatzChecklistSection'
import { RSHAMATZ_REHEV_CHECKLIST_SECTIONS } from './rshamatzRehevChecklist.data'

function RshamatzRehevScreen() {
  const [checked, setChecked] = useState<Record<string, boolean>>({})
  const [notes, setNotes] = useState('')

  function handleToggle(id: string) {
    setChecked((prev) => ({ ...prev, [id]: !prev[id] }))
  }

  return (
    <div dir="rtl" className="flex flex-col h-full overflow-y-auto">
      <header className="py-4 px-4 text-center font-bold text-lg border-b border-neutral-200 text-neutral-800 shrink-0">
        רשמ"צ רכב
      </header>

      <div className="flex flex-col gap-6 p-4 pb-8">
        {RSHAMATZ_REHEV_CHECKLIST_SECTIONS.map((section) => (
          <RshamatzChecklistSection
            key={section.id}
            section={section}
            checked={checked}
            onToggle={handleToggle}
          />
        ))}

        <section className="flex flex-col gap-2">
          <label htmlFor="rshamatz-rehev-notes" className="font-bold text-neutral-900 text-base">
            הערות:
          </label>
          <textarea
            id="rshamatz-rehev-notes"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
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
