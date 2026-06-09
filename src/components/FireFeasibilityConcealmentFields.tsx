import { useEffect, useMemo, useState } from 'react'
import type { ConcealmentFeasibilityEvaluationInput } from '../domain/concealmentFeasibility.types'
import FormField from './FormField'
import Input from './Input'

function parseOptionalNumber(value: string): number | null {
  if (value === '') return null
  const parsed = Number(value)
  return Number.isNaN(parsed) ? null : parsed
}

interface FireFeasibilityConcealmentFieldsProps {
  onConcealmentChange: (concealment: ConcealmentFeasibilityEvaluationInput | null) => void
}

function FireFeasibilityConcealmentFields({
  onConcealmentChange,
}: FireFeasibilityConcealmentFieldsProps) {
  const [hide1DistanceInput, setHide1DistanceInput] = useState('')
  const [hide1HeightDiffInput, setHide1HeightDiffInput] = useState('')
  const [hide2Distance, setHide2Distance] = useState('')
  const [hide2HeightDiff, setHide2HeightDiff] = useState('')

  const concealment = useMemo(() => {
    const targetToConcealmentRangeMeters = parseOptionalNumber(hide1DistanceInput)
    const targetToConcealmentHeightDifferenceMeters = parseOptionalNumber(hide1HeightDiffInput)

    if (
      targetToConcealmentRangeMeters === null ||
      targetToConcealmentHeightDifferenceMeters === null
    ) {
      return null
    }

    return { targetToConcealmentRangeMeters, targetToConcealmentHeightDifferenceMeters }
  }, [hide1DistanceInput, hide1HeightDiffInput])

  useEffect(() => {
    onConcealmentChange(concealment)
  }, [concealment, onConcealmentChange])

  return (
    <>
      <FormField label="מרחק הסתר מטרה-1">
        <Input
          type="number"
          value={hide1DistanceInput}
          onChange={(e) => setHide1DistanceInput(e.target.value)}
        />
      </FormField>

      <FormField label="הפרש גובה הסתר מטרה-1">
        <Input
          type="number"
          value={hide1HeightDiffInput}
          onChange={(e) => setHide1HeightDiffInput(e.target.value)}
        />
      </FormField>

      <FormField label="מרחק הסתר מטרה-2">
        <Input
          type="number"
          value={hide2Distance}
          onChange={(e) => setHide2Distance(e.target.value)}
        />
      </FormField>

      <FormField label="הפרש גובה הסתר מטרה-2">
        <Input
          type="number"
          value={hide2HeightDiff}
          onChange={(e) => setHide2HeightDiff(e.target.value)}
        />
      </FormField>
    </>
  )
}

export default FireFeasibilityConcealmentFields
