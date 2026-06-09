import { useEffect, useState } from 'react'
import type { FireFeasibilityTargetMetrics } from './FireFeasibilityTargetCoordsSection'
import FormField from './FormField'
import Input from './Input'

function parseOptionalNumber(value: string): number | null {
  if (value === '') return null
  const parsed = Number(value)
  return Number.isNaN(parsed) ? null : parsed
}

interface FireFeasibilityTargetRangeSectionProps {
  onMetricsChange: (metrics: FireFeasibilityTargetMetrics) => void
}

function FireFeasibilityTargetRangeSection({
  onMetricsChange,
}: FireFeasibilityTargetRangeSectionProps) {
  const [rangeInput, setRangeInput] = useState('')
  const [heightDiffInput, setHeightDiffInput] = useState('')

  useEffect(() => {
    onMetricsChange({
      rangeMeters: parseOptionalNumber(rangeInput),
      heightDifferenceMeters: parseOptionalNumber(heightDiffInput),
    })
  }, [rangeInput, heightDiffInput, onMetricsChange])

  return (
    <>
      <FormField label="טווח עמדה-מטרה">
        <Input
          type="number"
          value={rangeInput}
          onChange={(e) => setRangeInput(e.target.value)}
        />
      </FormField>

      <FormField label="הפרש גובה עמדה-מטרה">
        <Input
          type="number"
          value={heightDiffInput}
          onChange={(e) => setHeightDiffInput(e.target.value)}
        />
      </FormField>
    </>
  )
}

export default FireFeasibilityTargetRangeSection
