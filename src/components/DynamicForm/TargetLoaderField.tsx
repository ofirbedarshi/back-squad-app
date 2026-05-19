import type { FieldErrors, UseFormGetValues, UseFormRegister, UseFormSetValue } from 'react-hook-form'
import TargetLoadButton from '../TargetLoadButton'
import LoaderFieldShell from './LoaderFieldShell'
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
    <LoaderFieldShell
      fieldDef={fieldDef}
      register={register}
      getValues={getValues}
      parentByKey={parentByKey}
      errorMessage={errorMessage}
      actions={
        <TargetLoadButton
          targetId={currentTargetId}
          onSelect={handleSelect}
          onClear={handleClear}
          errorMessage={errorMessage}
        />
      }
    />
  )
}

export default TargetLoaderField
