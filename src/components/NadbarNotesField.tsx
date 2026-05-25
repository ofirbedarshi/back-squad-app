interface NadbarNotesFieldProps {
  value: string
  onChange: (value: string) => void
}

function NadbarNotesField({ value, onChange }: NadbarNotesFieldProps) {
  return (
    <section className="flex flex-col gap-2 mt-2">
      <label htmlFor="nadbar-notes" className="font-bold text-neutral-900 text-base">
        הערות:
      </label>
      <textarea
        id="nadbar-notes"
        value={value}
        onChange={(event) => onChange(event.target.value)}
        rows={4}
        className="w-full rounded-lg border border-neutral-300 bg-white px-3 py-3 text-base text-neutral-900 placeholder:text-neutral-500 focus:outline-none focus:border-neutral-400 resize-y min-h-[96px]"
        placeholder=""
      />
    </section>
  )
}

export default NadbarNotesField
