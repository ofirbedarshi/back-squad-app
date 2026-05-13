import { useRef, useState } from 'react'
import { useFormContext } from 'react-hook-form'
import { parseDegreeInput } from '../components/positionForm.schema'

export function usePlusN(fieldPath: string, n: number): {
  applied: boolean
  apply: () => void
  registerOptions: {
    setValueAs: typeof parseDegreeInput
    validate: () => true | string
    onChange: () => void
  }
  appliedFieldPath?: string
}
export function usePlusN(fieldPath: string, appliedFieldPath: string, n: number): {
  applied: boolean
  apply: () => void
  registerOptions: {
    setValueAs: typeof parseDegreeInput
    validate: () => true | string
    onChange: () => void
  }
  appliedFieldPath: string
}
export function usePlusN(fieldPath: string, appliedFieldPathOrN: string | number, maybeN?: number) {
  const appliedFieldPath = typeof appliedFieldPathOrN === 'string' ? appliedFieldPathOrN : undefined
  const n = typeof appliedFieldPathOrN === 'number' ? appliedFieldPathOrN : maybeN ?? 0
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const path = fieldPath as any
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const appliedPath = appliedFieldPath as any
  const { getValues, setValue, clearErrors } = useFormContext()

  const initialApplied = (() => {
    const v = getValues(path) as number | undefined
    return typeof v === 'number' && !isNaN(v)
  })()

  const appliedRef = useRef(initialApplied)
  const [applied, setApplied] = useState(initialApplied)

  function setAppliedValue(value: boolean) {
    appliedRef.current = value
    if (appliedFieldPath) {
      setValue(appliedPath, value, { shouldDirty: true })
    }
    setApplied(value)
  }

  function apply() {
    const current = getValues(path) as number | undefined
    const safeValue = typeof current === 'number' && !isNaN(current) ? current : 0
    setAppliedValue(true)
    setValue(path, safeValue + n, { shouldDirty: true, shouldValidate: true })
    clearErrors(path)
  }

  const registerOptions = {
    setValueAs: parseDegreeInput,
    validate: () => !appliedFieldPath || appliedRef.current || `יש ללחוץ על +${n} לפני השמירה`,
    onChange: () => {
      setAppliedValue(false)
    },
  }

  return { applied, apply, registerOptions, appliedFieldPath }
}
