import { useEffect, useMemo, useState } from 'react'
import Modal from './base/Modal'
import SegmentedToggle from './base/SegmentedToggle'
import { saveCloudHeight } from '../useCases/saveCloudHeight'
import { metersToFeet, feetToMeters } from '../domain/unitConversion'
import type { CloudHeightSettings, CloudHeightUnit } from '../domain/cloudHeight.types'
import { FORM_DRAFT_KEYS } from '../domain/formDraft.types'
import { loadFormDraftUseCase } from '../useCases/loadFormDraft'
import { saveFormDraftUseCase } from '../useCases/saveFormDraft'
import { clearFormDraftUseCase } from '../useCases/clearFormDraft'
import { debounce } from '../utils/debounce'
import { FORM_DRAFT_DEBOUNCE_MS } from '../domain/formDraft.types'
import { useConfirm } from '../hooks/useConfirm'

interface CloudHeightModalProps {
  current: CloudHeightSettings
  onClose: () => void
  onSaved: (updated: CloudHeightSettings) => void
}

const UNIT_OPTIONS = [
  { label: 'מטרים', value: 'meters' },
  { label: 'רגל', value: 'feet' },
]

function toDisplayValue(heightMeters: number | null, unit: CloudHeightUnit): string {
  if (heightMeters === null) return ''
  const value = unit === 'feet' ? metersToFeet(heightMeters) : heightMeters
  return String(Math.round(value))
}

function readInitialDraftOrCurrent(current: CloudHeightSettings): { unit: CloudHeightUnit; input: string } {
  const raw = loadFormDraftUseCase(FORM_DRAFT_KEYS.CLOUD_HEIGHT)
  if (!raw || typeof raw !== 'object') {
    return {
      unit: current.displayUnit,
      input: toDisplayValue(current.heightMeters, current.displayUnit),
    }
  }
  const u = raw.displayUnit
  const iv = raw.inputValue
  if (u === 'meters' || u === 'feet') {
    return {
      unit: u,
      input: typeof iv === 'string' ? iv : toDisplayValue(current.heightMeters, u),
    }
  }
  return {
    unit: current.displayUnit,
    input: toDisplayValue(current.heightMeters, current.displayUnit),
  }
}

function CloudHeightModal({ current, onClose, onSaved }: CloudHeightModalProps) {
  const confirm = useConfirm()
  const initial = useMemo(() => readInitialDraftOrCurrent(current), [current])
  const [unit, setUnit] = useState<CloudHeightUnit>(initial.unit)
  const [inputValue, setInputValue] = useState<string>(initial.input)

  const debouncedPersistDraft = useMemo(
    () =>
      debounce((payload: { inputValue: string; displayUnit: CloudHeightUnit }) => {
        saveFormDraftUseCase(FORM_DRAFT_KEYS.CLOUD_HEIGHT, {
          inputValue: payload.inputValue,
          displayUnit: payload.displayUnit,
        })
      }, FORM_DRAFT_DEBOUNCE_MS),
    [],
  )

  useEffect(() => () => debouncedPersistDraft.cancel(), [debouncedPersistDraft])

  useEffect(() => {
    debouncedPersistDraft({ inputValue, displayUnit: unit })
  }, [inputValue, unit, debouncedPersistDraft])

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

    clearFormDraftUseCase(FORM_DRAFT_KEYS.CLOUD_HEIGHT)
    debouncedPersistDraft.cancel()
    saveCloudHeight(heightMeters, unit)
    onSaved({ heightMeters, displayUnit: unit })
    onClose()
  }

  async function handleClearDraft() {
    const ok = await confirm({
      title: 'ניקוי טיוטה',
      message: 'לחזור לערכים השמורים של גובה ענן? שינויי טיוטה יאבדו.',
      confirmLabel: 'נקה טיוטה',
      cancelLabel: 'ביטול',
      variant: 'danger',
    })
    if (!ok) return
    clearFormDraftUseCase(FORM_DRAFT_KEYS.CLOUD_HEIGHT)
    debouncedPersistDraft.cancel()
    setUnit(current.displayUnit)
    setInputValue(toDisplayValue(current.heightMeters, current.displayUnit))
  }

  const isSaveDisabled = inputValue.trim() !== '' && (isNaN(parseFloat(inputValue)) || !isFinite(parseFloat(inputValue)))

  return (
    <Modal
      title="גובה בסיס ענן"
      onClose={onClose}
      onSave={handleSave}
      saveDisabled={isSaveDisabled}
      headerExtra={
        <button
          type="button"
          onClick={() => void handleClearDraft()}
          className="text-xs font-semibold text-red-700 border border-red-200 rounded-lg px-2.5 py-1.5 active:bg-red-50 touch-manipulation"
        >
          נקה טיוטה
        </button>
      }
    >
      <div className="flex flex-col gap-5">
        <SegmentedToggle options={UNIT_OPTIONS} value={unit} onChange={handleUnitChange} />

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
