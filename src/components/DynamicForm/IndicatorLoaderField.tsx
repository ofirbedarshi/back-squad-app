import type { FieldErrors, UseFormGetValues, UseFormRegister, UseFormSetValue } from 'react-hook-form'
import IndicatorLoadButton from '../IndicatorLoadButton'
import LoaderFieldShell from './LoaderFieldShell'
import type { FormValues, IndicatorLoaderField as IndicatorLoaderFieldDef, ToggleWithConditionsField } from '../../domain/dynamicForm.types'
import type { Indicator } from '../../domain/indicator.types'

interface IndicatorLoaderFieldProps {
  fieldDef: IndicatorLoaderFieldDef
  currentIndicatorId: string | undefined
  setValue: UseFormSetValue<FormValues>
  register: UseFormRegister<FormValues>
  errors: FieldErrors<FormValues>
  getValues: UseFormGetValues<FormValues>
  parentByKey: Map<string, ToggleWithConditionsField>
}

function IndicatorLoaderField({
  fieldDef,
  currentIndicatorId,
  setValue,
  register,
  errors,
  getValues,
  parentByKey,
}: IndicatorLoaderFieldProps) {
  function handleSelect(indicator: Indicator) {
    const { key, fieldMappings } = fieldDef
    setValue(key, indicator.id)
    if (fieldMappings.indicatorName) setValue(fieldMappings.indicatorName, indicator.indicatorName)
    if (fieldMappings.coordinates) setValue(fieldMappings.coordinates, indicator.coordinates)
    if (fieldMappings.altitude) setValue(fieldMappings.altitude, String(indicator.altitude))
    if (fieldMappings.means) setValue(fieldMappings.means, indicator.means)
    if (fieldMappings.markCode) setValue(fieldMappings.markCode, String(indicator.markCode))
  }

  function handleClear() {
    const { key, fieldMappings } = fieldDef
    setValue(key, '')
    if (fieldMappings.indicatorName) setValue(fieldMappings.indicatorName, '')
    if (fieldMappings.coordinates) setValue(fieldMappings.coordinates, { east: '', north: '', palach: '' })
    if (fieldMappings.altitude) setValue(fieldMappings.altitude, '')
    if (fieldMappings.means) setValue(fieldMappings.means, '')
    if (fieldMappings.markCode) setValue(fieldMappings.markCode, '')
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
        <IndicatorLoadButton
          indicatorId={currentIndicatorId}
          onSelect={handleSelect}
          onClear={handleClear}
          errorMessage={errorMessage}
        />
      }
    />
  )
}

export default IndicatorLoaderField
