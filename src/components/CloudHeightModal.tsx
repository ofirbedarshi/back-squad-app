import { useState } from 'react'
import Modal from './base/Modal'
import SegmentedToggle from './base/SegmentedToggle'
import { CLOUD_HEIGHT_UNIT_OPTIONS } from '../domain/cloudHeight'
import { saveCloudHeight } from '../useCases/saveCloudHeight'
import { metersToFeet, feetToMeters } from '../domain/unitConversion'
import type { CloudHeightSettings, CloudHeightUnit } from '../domain/cloudHeight.types'

interface CloudHeightModalProps {
  current: CloudHeightSettings
  onClose: () => void
  onSaved: (updated: CloudHeightSettings) => void
}

function toDisplayValue(heightMeters: number | null, unit: CloudHeightUnit): string {
  if (heightMeters === null) return ''
  const value = unit === 'feet' ? metersToFeet(heightMeters) : heightMeters
  return String(Math.round(value))
}

function CloudHeightModal({ current, onClose, onSaved }: CloudHeightModalProps) {
  const [unit, setUnit] = useState<CloudHeightUnit>(current.displayUnit)
  const [inputValue, setInputValue] = useState<string>(
    toDisplayValue(current.heightMeters, current.displayUnit),
  )

  function handleUnitChange(newUnit: string) {
    const typed = newUnit as CloudHeightUnit
    const parsed = parseFloat(inputValue)
    if (!isNaN(parsed) && isFinite(parsed)) {
      const inMeters = unit === 'feet' ? feetToMeters(parsed) : parsed
      const converted = typed === 'feet' ? metersToFeet(inMeters) : inMeters
      setInputValue(String(Math.round(converted)))
    }
    setUnit(typed)
  }

  function handleSave() {
    const parsed = parseFloat(inputValue)
    const heightMeters =
      inputValue.trim() === '' || isNaN(parsed) || !isFinite(parsed)
        ? null
        : unit === 'feet'
          ? feetToMeters(parsed)
          : parsed

    saveCloudHeight(heightMeters, unit)
    onSaved({ heightMeters, displayUnit: unit })
    onClose()
  }

  const isSaveDisabled = inputValue.trim() !== '' && (isNaN(parseFloat(inputValue)) || !isFinite(parseFloat(inputValue)))

  return (
    <Modal title="גובה בסיס ענן" onClose={onClose} onSave={handleSave} saveDisabled={isSaveDisabled}>
      <div className="flex flex-col gap-5">
        <SegmentedToggle options={[...CLOUD_HEIGHT_UNIT_OPTIONS]} value={unit} onChange={handleUnitChange} />

        <div className="flex flex-col gap-2">
          <label className="text-sm font-medium text-neutral-600">
            גובה ({unit === 'meters' ? 'מטרים' : 'רגל'})
          </label>
          <input
            type="number"
            inputMode="numeric"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder={unit === 'meters' ? 'לדוגמה: 1500' : 'לדוגמה: 5000'}
            className="w-full border border-neutral-300 rounded-xl px-4 py-3 text-lg text-right bg-white focus:outline-none focus:border-blue-400"
          />
        </div>

        {inputValue.trim() !== '' && (
          <p className="text-xs text-neutral-400 text-center">
            {(() => {
              const parsed = parseFloat(inputValue)
              if (isNaN(parsed) || !isFinite(parsed)) return null
              const inMeters = unit === 'feet' ? feetToMeters(parsed) : parsed
              const inFeet = unit === 'meters' ? metersToFeet(parsed) : parsed
              return `${Math.round(inMeters).toLocaleString('he-IL')} מ׳ = ${Math.round(inFeet).toLocaleString('he-IL')} רגל`
            })()}
          </p>
        )}
      </div>
    </Modal>
  )
}

export default CloudHeightModal
