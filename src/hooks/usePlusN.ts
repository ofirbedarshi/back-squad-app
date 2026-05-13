import { useState } from 'react'
import { useFormContext } from 'react-hook-form'
import { parseDegreeInput } from '../components/positionForm.schema'

export function usePlusN(fieldPath: string, n: number) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const path = fieldPath as any
  const { getValues, setValue, clearErrors } = useFormContext()

  const [applied, setApplied] = useState(() => {
    const v = getValues(path) as number | undefined
    return typeof v === 'number' && !isNaN(v)
  })

  function apply() {
    const current = getValues(path) as number | undefined
    const safeValue = typeof current === 'number' && !isNaN(current) ? current : 0
    setValue(path, safeValue + n)
    clearErrors(path)
    setApplied(true)
  }

  const registerOptions = {
    setValueAs: parseDegreeInput,
    validate: () => applied || `יש ללחוץ על +${n} לפני השמירה`,
    onChange: () => setApplied(false),
  }

  return { applied, apply, registerOptions }
}
