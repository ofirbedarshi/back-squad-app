import type { FieldErrors, UseFormGetValues, UseFormRegister, UseFormSetValue } from 'react-hook-form'
import TargetLoadButton from '../TargetLoadButton'
import { makeFieldValidator } from '../../domain/dynamicFormValidation'
import type { FormValues, TargetLoaderField as TargetLoaderFieldDef, ToggleWithConditionsField } from '../../domain/dynamicForm.types'
import type { Target } from '../../domain/target.types'

interface TargetLoaderFieldProps {
  fieldDef: TargetLoaderFieldDef
  currentTargetId: string | undefined
  setValue: UseFormSetValue<FormValues>
  register: UseFormRegister<FormValues>
  errors: FieldErrors<FormValues>
  getValues: UseFormGetValues<FormValues>
  parentByKey: Map<string, ToggleWithConditionsField>
}

function TargetLoaderField({
  fieldDef,
  currentTargetId,
  setValue,
  register,
  errors,
  getValues,
  parentByKey,
}: TargetLoaderFieldProps) {
  function handleSelect(target: Target) {
    const { key, fieldMappings } = fieldDef
    setValue(key, target.id)
    if (fieldMappings.targetName) setValue(fieldMappings.targetName, target.targetName)
    if (fieldMappings.targetCoords) setValue(fieldMappings.targetCoords, target.coordinates)
    if (fieldMappings.targetAltitude) setValue(fieldMappings.targetAltitude, target.altitude != null ? String(target.altitude) : '')
    if (fieldMappings.targetDescription) setValue(fieldMappings.targetDescription, target.targetDescription ?? '')
  }

  function handleClear() {
    const { key, fieldMappings } = fieldDef
    setValue(key, '')
    if (fieldMappings.targetName) setValue(fieldMappings.targetName, '')
    if (fieldMappings.targetCoords) setValue(fieldMappings.targetCoords, { east: '', north: '', palach: '' })
    if (fieldMappings.targetAltitude) setValue(fieldMappings.targetAltitude, '')
    if (fieldMappings.targetDescription) setValue(fieldMappings.targetDescription, '')
  }

  const error = errors[fieldDef.key]
  const errorMessage = error && 'message' in error ? (error.message as string) : undefined

  return (
    <>
      <input
        type="hidden"
        {...register(fieldDef.key, {
          validate: makeFieldValidator(fieldDef, getValues, parentByKey),
        })}
      />

      <div className="flex flex-col gap-1">
        <div className="flex items-center justify-between gap-2 pt-2">
          {fieldDef.bold
            ? <h2 className="text-base font-bold underline text-neutral-800">{fieldDef.text}</h2>
            : <h3 className="text-sm font-semibold text-neutral-500">{fieldDef.text}</h3>
          }

          <TargetLoadButton
            targetId={currentTargetId}
            onSelect={handleSelect}
            onClear={handleClear}
            errorMessage={errorMessage}
          />
        </div>

        {errorMessage && (
          <p className="text-xs text-red-500 px-1">{errorMessage}</p>
        )}
      </div>
    </>
  )
}

export default TargetLoaderField
