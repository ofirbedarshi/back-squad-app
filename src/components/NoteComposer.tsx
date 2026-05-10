interface NoteComposerProps {
  isOpen: boolean
  draftText: string
  onDraftTextChange: (value: string) => void
  onRequestOpen: () => void
  onSave: () => void
  onCancel: () => void
}

function NoteComposer({
  isOpen,
  draftText,
  onDraftTextChange,
  onRequestOpen,
  onSave,
  onCancel,
}: NoteComposerProps) {
  if (!isOpen) {
    return (
      <button
        type="button"
        onClick={onRequestOpen}
        className="w-full py-4 rounded-2xl border-2 border-dashed border-neutral-300 text-neutral-600 font-semibold text-base active:bg-neutral-100 transition-colors touch-manipulation select-none"
      >
        + הוסף הערה
      </button>
    )
  }

  return (
    <div className="flex flex-col gap-3 rounded-2xl border border-neutral-200 bg-white p-4 shadow-sm">
      <label htmlFor="note-draft" className="text-sm font-medium text-neutral-700">
        טקסט ההערה
      </label>
      <textarea
        id="note-draft"
        value={draftText}
        onChange={(e) => onDraftTextChange(e.target.value)}
        rows={5}
        className="w-full rounded-xl border border-neutral-200 px-3 py-2 text-base text-neutral-900 placeholder:text-neutral-400 focus:outline-none focus:ring-2 focus:ring-blue-500/30 resize-y min-h-[120px]"
        placeholder="כתוב כאן…"
      />
      <div className="flex gap-2">
        <button
          type="button"
          onClick={onSave}
          className="flex-1 py-3 rounded-xl bg-blue-600 text-white font-semibold text-base active:brightness-90 touch-manipulation select-none"
        >
          שמור
        </button>
        <button
          type="button"
          onClick={onCancel}
          className="flex-1 py-3 rounded-xl border border-neutral-200 bg-neutral-50 text-neutral-800 font-semibold text-base active:bg-neutral-100 touch-manipulation select-none"
        >
          ביטול
        </button>
      </div>
    </div>
  )
}

export default NoteComposer
