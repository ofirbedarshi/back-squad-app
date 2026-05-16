import { useEffect, useRef } from 'react'
import type { UseFormRegister, UseFormSetValue, UseFormWatch } from 'react-hook-form'
import type { BachRearPositionFormFields } from '../../domain/bachRearPosition.types'
import type { FormValues, CurrentPositionLoaderField as CurrentPositionLoaderFieldDef } from '../../domain/dynamicForm.types'
import { loadBachRearPositionFromCurrentUseCase } from '../../useCases/loadBachRearPositionFromCurrent'

interface CurrentPositionLoaderFieldProps {
  fieldDef: CurrentPositionLoaderFieldDef
  setValue: UseFormSetValue<FormValues>
  register: UseFormRegister<FormValues>
  watch: UseFormWatch<FormValues>
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

function CurrentPositionLoaderField({ fieldDef, setValue, register, watch }: CurrentPositionLoaderFieldProps) {
  const hasAutoLoadedRef = useRef(false)
  const currentPositionId = watch(fieldDef.key) as string | undefined
  const savedPositionName = fieldDef.fieldMappings.positionName
    ? (watch(fieldDef.fieldMappings.positionName) as string | undefined)
    : undefined

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

  return <input type="hidden" {...register(fieldDef.key)} />
}

export default CurrentPositionLoaderField
