import { useState } from 'react'
import FormField from './FormField'
import Modal from './base/Modal'

interface FireFeasibilityRangeHeightTargetMockModalProps {
  onClose: () => void
  onSubmit: (input: { rangeMeters: number; heightDifferenceMeters: number }) => Promise<void>
}

function parseNumber(value: string): number | null {
  const parsed = Number(value)
  return Number.isFinite(parsed) ? parsed : null
}

function FireFeasibilityRangeHeightTargetMockModal({
  onClose,
  onSubmit,
}: FireFeasibilityRangeHeightTargetMockModalProps) {
  const [rangeInput, setRangeInput] = useState('')
  const [heightDifferenceInput, setHeightDifferenceInput] = useState('')
  const [saving, setSaving] = useState(false)

  const rangeValue = parseNumber(rangeInput)
  const heightDifferenceValue = parseNumber(heightDifferenceInput)
  const rangeError =
    rangeInput.trim() === ''
      ? 'יש להזין טווח'
      : rangeValue === null || rangeValue <= 0
        ? 'טווח חייב להיות מספר חיובי'
        : ''
  const heightDifferenceError =
    heightDifferenceInput.trim() === ''
      ? 'יש להזין הפרש גובה'
      : heightDifferenceValue === null
        ? 'הפרש גובה חייב להיות מספר תקין'
        : ''
  const isSaveDisabled = saving || Boolean(rangeError) || Boolean(heightDifferenceError)

  async function handleSave() {
    if (rangeValue === null || heightDifferenceValue === null || rangeValue <= 0) return
    setSaving(true)
    try {
      await onSubmit({
        rangeMeters: rangeValue,
        heightDifferenceMeters: heightDifferenceValue,
      })
      onClose()
    } finally {
      setSaving(false)
    }
  }

  return (
    <Modal
      title="מטרת בדיקה — טווח והפרש גובה"
      onClose={onClose}
      onSave={() => void handleSave()}
      saveDisabled={isSaveDisabled}
      saveLabel="צור מטרה"
    >
      <div className="flex flex-col gap-4">
        <FormField label="טווח עמדה-מטרה (מ׳)" error={rangeError || undefined}>
          <input
            type="number"
            inputMode="numeric"
            value={rangeInput}
            onChange={(event) => setRangeInput(event.target.value)}
            placeholder="לדוגמה: 4200"
            className="w-full rounded-xl border border-neutral-300 bg-white px-4 py-3 text-right focus:border-blue-400 focus:outline-none"
          />
        </FormField>

        <FormField label="הפרש גובה מטרה-עמדה (מ׳)" error={heightDifferenceError || undefined}>
          <input
            type="number"
            inputMode="numeric"
            value={heightDifferenceInput}
            onChange={(event) => setHeightDifferenceInput(event.target.value)}
            placeholder="לדוגמה: 80 או ‎-20"
            className="w-full rounded-xl border border-neutral-300 bg-white px-4 py-3 text-right focus:border-blue-400 focus:outline-none"
          />
        </FormField>

        <p className="text-sm leading-relaxed text-neutral-500">
          נוצרת מטרה חדשה לפי העמדה הנוכחית. שם המטרה יכלול טווח והפרש גובה כדי שיהיה קל לבחור אותה במסכי
          קישור מטרה.
        </p>
      </div>
    </Modal>
  )
}

export default FireFeasibilityRangeHeightTargetMockModal
