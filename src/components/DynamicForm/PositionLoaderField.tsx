import type { FieldErrors, UseFormGetValues, UseFormRegister, UseFormSetValue } from 'react-hook-form'
import PositionLoadButton from '../PositionLoadButton'
import LoaderFieldShell from './LoaderFieldShell'
import type {
  FormValues,
  PositionLoaderField as PositionLoaderFieldDef,
  ToggleWithConditionsField,
} from '../../domain/dynamicForm.types'
import type { Position } from '../../domain/position.types'

function applyPosition(
  setValue: UseFormSetValue<FormValues>,
  fieldDef: PositionLoaderFieldDef,
  position: Position,
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
  errors: FieldErrors<FormValues>
  getValues: UseFormGetValues<FormValues>
  parentByKey: Map<string, ToggleWithConditionsField>
}

function PositionLoaderField({
  fieldDef,
  currentPositionId,
  setValue,
  register,
  errors,
  getValues,
  parentByKey,
}: PositionLoaderFieldProps) {
  function handleSelect(position: Position) {
    applyPosition(setValue, fieldDef, position)
  }

  function handleClear() {
    clearPositionFields(setValue, fieldDef)
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
        <PositionLoadButton
          positionId={currentPositionId}
          onSelect={handleSelect}
          onClear={handleClear}
          loadLabel="טען עמדה"
          errorMessage={errorMessage}
        />
      }
    />
  )
}

export default PositionLoaderField
