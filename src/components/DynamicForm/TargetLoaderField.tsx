import { useMemo, useState } from 'react'
import type { FieldErrors, UseFormRegister, UseFormSetValue } from 'react-hook-form'
import Modal from '../base/Modal'
import TargetCard from '../TargetCard'
import { loadTargetsUseCase } from '../../useCases/loadTargets'
import type { FormValues, TargetLoaderField as TargetLoaderFieldDef } from '../../domain/dynamicForm.types'
import type { Target } from '../../domain/target.types'

interface TargetLoaderFieldProps {
  fieldDef: TargetLoaderFieldDef
  currentTargetId: string | undefined
  setValue: UseFormSetValue<FormValues>
  register: UseFormRegister<FormValues>
  errors: FieldErrors<FormValues>
}

function TargetLoaderField({ fieldDef, currentTargetId, setValue, register, errors }: TargetLoaderFieldProps) {
  const [showModal, setShowModal] = useState(false)
  const targets = useMemo(() => loadTargetsUseCase(), [showModal])
  const loadedTarget = targets.find((t) => t.id === currentTargetId)

  function handleSelect(target: Target) {
    const { key, fieldMappings } = fieldDef
    setValue(key, target.id)
    if (fieldMappings.targetName) setValue(fieldMappings.targetName, target.targetName)
    if (fieldMappings.targetCoords) setValue(fieldMappings.targetCoords, target.coordinates)
    if (fieldMappings.targetAltitude) setValue(fieldMappings.targetAltitude, target.altitude != null ? String(target.altitude) : '')
    if (fieldMappings.targetDescription) setValue(fieldMappings.targetDescription, target.targetDescription ?? '')
    setShowModal(false)
  }

  function handleClear() {
    const { key, fieldMappings } = fieldDef
    setValue(key, '')
    if (fieldMappings.targetName) setValue(fieldMappings.targetName, '')
    if (fieldMappings.targetCoords) setValue(fieldMappings.targetCoords, { east: '', north: '' })
    if (fieldMappings.targetAltitude) setValue(fieldMappings.targetAltitude, '')
    if (fieldMappings.targetDescription) setValue(fieldMappings.targetDescription, '')
  }

  const error = errors[fieldDef.key]
  const errorMessage = error && 'message' in error ? (error.message as string) : undefined

  return (
    <>
      {/* Hidden input so react-hook-form validates targetId as required */}
      <input
        type="hidden"
        {...register(fieldDef.key, { validate: (v) => !!v || 'יש לטעון מטרה לפני שמירה' })}
      />

      <div className="flex flex-col gap-1">
        <div className="flex items-center justify-between gap-2 pt-2">
          {fieldDef.bold
            ? <h2 className="text-base font-bold underline text-neutral-800">{fieldDef.text}</h2>
            : <h3 className="text-sm font-semibold text-neutral-500">{fieldDef.text}</h3>
          }

          {loadedTarget ? (
          <div className="flex items-center gap-1.5 shrink-0">
            <span className="text-xs font-medium text-blue-700 bg-blue-50 border border-blue-200 rounded-full px-2 py-0.5 max-w-[140px] truncate">
              {loadedTarget.targetName}
            </span>
            <button
              type="button"
              onClick={handleClear}
              className="text-neutral-400 text-base leading-none active:text-neutral-600 touch-manipulation px-1"
              aria-label="נקה מטרה"
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
              טען מטרה
            </button>
          )}
        </div>

        {errorMessage && (
          <p className="text-xs text-red-500 px-1">{errorMessage}</p>
        )}
      </div>

      {showModal && (
        <Modal title="בחר מטרה" onClose={() => setShowModal(false)}>
          <div className="flex flex-col gap-3">
            {targets.length === 0 ? (
              <p className="text-center text-neutral-500 text-sm py-6">אין מטרות שמורות לבחירה</p>
            ) : (
              targets.map((target) => (
                <TargetCard key={target.id} target={target} onClick={() => handleSelect(target)} />
              ))
            )}
          </div>
        </Modal>
      )}
    </>
  )
}

export default TargetLoaderField
