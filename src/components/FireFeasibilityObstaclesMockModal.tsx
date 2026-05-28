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

const OBSTACLE_FLIGHT_PATH_OPTIONS = FLIGHT_PATH_OPTIONS.filter((option) => option.value !== 'flat')

interface FireFeasibilityObstaclesMockModalProps {
  onClose: () => void
  onSubmit: (input: {
    desiredGenAEnabled: boolean
    flightPath: FireFeasibilityFlightPath
  }) => Promise<void>
}

function FireFeasibilityObstaclesMockModal({
  onClose,
  onSubmit,
}: FireFeasibilityObstaclesMockModalProps) {
  const [genAEnabled, setGenAEnabled] = useState(true)
  const [flightPath, setFlightPath] = useState<FireFeasibilityFlightPath>('low')
  const [saving, setSaving] = useState(false)

  async function handleSave() {
    setSaving(true)
    try {
      await onSubmit({
        desiredGenAEnabled: genAEnabled,
        flightPath,
      })
      onClose()
    } finally {
      setSaving(false)
    }
  }

  return (
    <Modal
      title="מטרת בדיקה — מכשולים"
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

        <FormField label="מסלול מעוף">
          <SegmentedToggle
            options={[...OBSTACLE_FLIGHT_PATH_OPTIONS]}
            value={flightPath}
            onChange={(value) => setFlightPath(value as FireFeasibilityFlightPath)}
          />
        </FormField>

        <p className="text-sm text-neutral-500 leading-relaxed">
          נוצרת מטרה לפי העמדה הנוכחית ונתוני מכשול תואמים לחישוב. לבדיקה חוזרת בחרו את אותו מסלול מעוף
          והזינו בטופס המכשולים את טווח המכשול וגובהו כפי שמופיעים בתוצאות.
        </p>
      </div>
    </Modal>
  )
}

export default FireFeasibilityObstaclesMockModal
