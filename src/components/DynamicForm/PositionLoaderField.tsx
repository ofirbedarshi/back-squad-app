import { useEffect, useMemo, useRef, useState } from 'react'
import type { FieldErrors, UseFormGetValues, UseFormRegister, UseFormSetValue, UseFormWatch } from 'react-hook-form'
import PositionPickerModal from '../PositionPickerModal'
import PositionCurrentArchiveBadge from '../base/PositionCurrentArchiveBadge'
import { useCurrentPosition } from '../../hooks/useCurrentPosition'
import { makeFieldValidator } from '../../domain/dynamicFormValidation'
import type {
  FormValues,
  PositionLoaderField as PositionLoaderFieldDef,
  ToggleWithConditionsField,
} from '../../domain/dynamicForm.types'
import type { Position } from '../../domain/position.types'
import { loadCurrentPositionUseCase } from '../../useCases/loadCurrentPosition'
import { loadPositionsUseCase } from '../../useCases/loadPositions'

function applyPosition(
  setValue: UseFormSetValue<FormValues>,
  fieldDef: PositionLoaderFieldDef,
  position: Position
): void {
  const { key, fieldMappings } = fieldDef
  setValue(key, position.id)
  if (fieldMappings.positionName) {
    setValue(fieldMappings.positionName, position.stationName)
  }
  if (fieldMappings.positionCoords) {
    setValue(fieldMappings.positionCoords, {
      east: position.coordinates.east,
      north: position.coordinates.north,
      palach: position.coordinates.palach,
    })
  }
  if (fieldMappings.positionAltitude) {
    setValue(fieldMappings.positionAltitude, String(position.altitude))
  }
  if (fieldMappings.aka) {
    setValue(fieldMappings.aka, position.aka != null ? String(position.aka) : '')
  }
}

function clearPositionFields(setValue: UseFormSetValue<FormValues>, fieldDef: PositionLoaderFieldDef): void {
  const { key, fieldMappings } = fieldDef
  setValue(key, '')
  if (fieldMappings.positionName) setValue(fieldMappings.positionName, '')
  if (fieldMappings.positionCoords) {
    setValue(fieldMappings.positionCoords, { east: '', north: '', palach: '' })
  }
  if (fieldMappings.positionAltitude) setValue(fieldMappings.positionAltitude, '')
  if (fieldMappings.aka) setValue(fieldMappings.aka, '')
}

interface PositionLoaderFieldProps {
  fieldDef: PositionLoaderFieldDef
  currentPositionId: string | undefined
  setValue: UseFormSetValue<FormValues>
  register: UseFormRegister<FormValues>
  watch: UseFormWatch<FormValues>
  errors: FieldErrors<FormValues>
  getValues: UseFormGetValues<FormValues>
  parentByKey: Map<string, ToggleWithConditionsField>
}

function PositionLoaderField({
  fieldDef,
  currentPositionId,
  setValue,
  register,
  watch,
  errors,
  getValues,
  parentByKey,
}: PositionLoaderFieldProps) {
  const currentStation = useCurrentPosition()
  const [showModal, setShowModal] = useState(false)
  const hasAutoLoadedRef = useRef(false)

  const positions = useMemo(() => loadPositionsUseCase(), [showModal])

  const nameKey = fieldDef.fieldMappings.positionName
  const savedName = nameKey ? (watch(nameKey) as string | undefined) : undefined

  const hasPositionSelection = Boolean(currentPositionId && String(currentPositionId).trim() !== '')

  useEffect(() => {
    if (hasAutoLoadedRef.current) {
      return
    }
    hasAutoLoadedRef.current = true

    if (currentPositionId || (savedName && savedName.trim() !== '')) {
      return
    }

    const cur = loadCurrentPositionUseCase()
    if (cur) {
      applyPosition(setValue, fieldDef, cur)
    }
  }, [currentPositionId, savedName, fieldDef, setValue])

  function handleSelect(position: Position) {
    applyPosition(setValue, fieldDef, position)
  }

  function handleClear() {
    clearPositionFields(setValue, fieldDef)
  }

  const error = errors[fieldDef.key]
  const errorMessage = error && 'message' in error ? (error.message as string) : undefined

  const isCurrentSelection =
    currentStation != null &&
    currentPositionId != null &&
    String(currentPositionId).trim() !== '' &&
    currentPositionId === currentStation.id

  return (
    <>
      <input
        type="hidden"
        {...register(fieldDef.key, {
          validate: makeFieldValidator(fieldDef, getValues, parentByKey),
        })}
      />

      <div className="flex flex-col gap-1">
        <div className="flex items-center justify-between gap-2 pt-2 flex-wrap">
          <div className="flex items-center gap-2 min-w-0 flex-wrap">
            {fieldDef.bold ? (
              <h2 className="text-base font-bold underline text-neutral-800">{fieldDef.text}</h2>
            ) : (
              <h3 className="text-sm font-semibold text-neutral-500">{fieldDef.text}</h3>
            )}
            {hasPositionSelection ? (
              <PositionCurrentArchiveBadge isCurrentStation={isCurrentSelection} />
            ) : null}
          </div>

          {hasPositionSelection ? (
            <div className="flex items-center gap-1.5 shrink-0 flex-wrap justify-end">
              <button
                type="button"
                onClick={() => setShowModal(true)}
                className="text-xs font-semibold text-blue-700 bg-white border border-blue-200 rounded-full px-2.5 py-0.5 active:bg-blue-50 touch-manipulation"
              >
                החלף
              </button>
              <button
                type="button"
                onClick={handleClear}
                className="text-neutral-400 text-base leading-none active:text-neutral-600 touch-manipulation px-1"
                aria-label="נקה עמדה"
              >
                ✕
              </button>
            </div>
          ) : (
            <button
              type="button"
              onClick={() => setShowModal(true)}
              className={[
                'shrink-0 text-xs font-semibold rounded-full px-3 py-1 touch-manipulation',
                errorMessage
                  ? 'text-red-600 bg-red-50 border border-red-300 active:bg-red-100'
                  : 'text-blue-600 bg-blue-50 border border-blue-200 active:bg-blue-100',
              ].join(' ')}
            >
              בחר עמדה
            </button>
          )}
        </div>

        {errorMessage && <p className="text-xs text-red-500 px-1">{errorMessage}</p>}
      </div>

      <PositionPickerModal
        open={showModal}
        title="בחר עמדה"
        onClose={() => setShowModal(false)}
        positions={positions}
        currentStationId={currentStation?.id}
        selectedPositionId={currentPositionId ?? null}
        onPick={handleSelect}
      />
    </>
  )
}

export default PositionLoaderField
