import { useState } from 'react'
import { FLIGHT_PATH_OPTIONS, FIRE_FEASIBILITY_GENERATION_LABELS } from '../domain/fireFeasibility.constants'
import type { FireFeasibilityFlightPath } from '../domain/fireFeasibility.types'
import FormField from './FormField'
import Modal from './base/Modal'
import SegmentedToggle from './base/SegmentedToggle'

const ENABLED_OPTIONS = [
  { label: 'מאפשר', value: 'true' },
  { label: 'לא מאפשר', value: 'false' },
] as const

interface FireFeasibilityCloudsMockModalProps {
  onClose: () => void
  onSubmit: (input: {
    desiredGenAEnabled: boolean
    desiredGenBEnabled: boolean
    flightPath: FireFeasibilityFlightPath
  }) => Promise<void>
}

function FireFeasibilityCloudsMockModal({ onClose, onSubmit }: FireFeasibilityCloudsMockModalProps) {
  const [genAEnabled, setGenAEnabled] = useState(true)
  const [genBEnabled, setGenBEnabled] = useState(true)
  const [flightPath, setFlightPath] = useState<FireFeasibilityFlightPath>('lofted')
  const [saving, setSaving] = useState(false)

  async function handleSave() {
    setSaving(true)
    try {
      await onSubmit({
        desiredGenAEnabled: genAEnabled,
        desiredGenBEnabled: genBEnabled,
        flightPath,
      })
      onClose()
    } finally {
      setSaving(false)
    }
  }

  return (
    <Modal
      title="מטרת בדיקה — עננים"
      onClose={onClose}
      onSave={() => void handleSave()}
      saveDisabled={saving}
      saveLabel="צור"
    >
      <div className="flex flex-col gap-4">
        <FormField label={FIRE_FEASIBILITY_GENERATION_LABELS.a}>
          <SegmentedToggle
            options={[...ENABLED_OPTIONS]}
            value={String(genAEnabled)}
            onChange={(value) => setGenAEnabled(value === 'true')}
          />
        </FormField>

        <FormField label={FIRE_FEASIBILITY_GENERATION_LABELS.b}>
          <SegmentedToggle
            options={[...ENABLED_OPTIONS]}
            value={String(genBEnabled)}
            onChange={(value) => setGenBEnabled(value === 'true')}
          />
        </FormField>

        <FormField label="מסלול מעוף">
          <SegmentedToggle
            options={[...FLIGHT_PATH_OPTIONS]}
            value={flightPath}
            onChange={(value) => setFlightPath(value as FireFeasibilityFlightPath)}
          />
        </FormField>

        <p className="text-sm text-neutral-500 leading-relaxed">
          נוצרת מטרה לפי העמדה הנוכחית וגובה העננים מהבית. לבדיקה חוזרת בחרו את אותו מסלול מעוף בטופס
          החישוב.
        </p>
      </div>
    </Modal>
  )
}

export default FireFeasibilityCloudsMockModal
