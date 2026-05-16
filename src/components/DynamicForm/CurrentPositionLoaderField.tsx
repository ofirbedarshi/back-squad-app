import { useEffect, useRef } from 'react'
import type { FieldErrors, UseFormGetValues, UseFormRegister, UseFormSetValue, UseFormWatch } from 'react-hook-form'
import type { BachRearPositionFormFields } from '../../domain/bachRearPosition.types'
import { makeFieldValidator } from '../../domain/dynamicFormValidation'
import type {
  FormValues,
  CurrentPositionLoaderField as CurrentPositionLoaderFieldDef,
  ToggleWithConditionsField,
} from '../../domain/dynamicForm.types'
import { loadBachRearPositionFromCurrentUseCase } from '../../useCases/loadBachRearPositionFromCurrent'

interface CurrentPositionLoaderFieldProps {
  fieldDef: CurrentPositionLoaderFieldDef
  setValue: UseFormSetValue<FormValues>
  register: UseFormRegister<FormValues>
  watch: UseFormWatch<FormValues>
  errors: FieldErrors<FormValues>
  getValues: UseFormGetValues<FormValues>
  parentByKey: Map<string, ToggleWithConditionsField>
}

function applyLoadedPosition(
  setValue: UseFormSetValue<FormValues>,
  fieldDef: CurrentPositionLoaderFieldDef,
  fields: BachRearPositionFormFields,
): void {
  const { key, fieldMappings } = fieldDef
  setValue(key, fields.rearPositionId)
  if (fieldMappings.positionName) {
    setValue(fieldMappings.positionName, fields.positionName)
  }
  if (fieldMappings.positionCoords) {
    setValue(fieldMappings.positionCoords, fields.positionCoords)
  }
  if (fieldMappings.positionAltitude) {
    setValue(fieldMappings.positionAltitude, fields.positionAltitude)
  }
  if (fieldMappings.aka) {
    setValue(fieldMappings.aka, fields.aka)
  }
}

function CurrentPositionLoaderField({
  fieldDef,
  setValue,
  register,
  watch,
  errors,
  getValues,
  parentByKey,
}: CurrentPositionLoaderFieldProps) {
  const hasAutoLoadedRef = useRef(false)
  const currentPositionId = watch(fieldDef.key) as string | undefined
  const savedPositionName = fieldDef.fieldMappings.positionName
    ? (watch(fieldDef.fieldMappings.positionName) as string | undefined)
    : undefined

  const error = errors[fieldDef.key]
  const errorMessage = error && 'message' in error ? (error.message as string) : undefined

  useEffect(() => {
    if (hasAutoLoadedRef.current) {
      return
    }
    hasAutoLoadedRef.current = true

    if (currentPositionId || savedPositionName) {
      return
    }

    applyLoadedPosition(setValue, fieldDef, loadBachRearPositionFromCurrentUseCase())
  }, [currentPositionId, fieldDef, savedPositionName, setValue])

  return (
    <>
      <input
        type="hidden"
        {...register(fieldDef.key, {
          validate: makeFieldValidator(fieldDef, getValues, parentByKey),
        })}
      />
      {errorMessage && (
        <p className="text-xs text-red-500 px-1 -mt-1">{errorMessage}</p>
      )}
    </>
  )
}

export default CurrentPositionLoaderField
