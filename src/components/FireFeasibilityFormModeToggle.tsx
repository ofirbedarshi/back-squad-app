import SegmentedToggle from './base/SegmentedToggle'
import type { FireFeasibilityMode } from '../domain/fireFeasibility.types'

const FIRE_FEASIBILITY_MODE_TOGGLE_OPTIONS = [
  { label: 'נצ', value: 'coords' },
  { label: 'מרחקים וגבהים', value: 'distances-heights' },
] as const

interface FireFeasibilityFormModeToggleProps {
  mode: FireFeasibilityMode
  onModeChange: (mode: FireFeasibilityMode) => void
}

function FireFeasibilityFormModeToggle({ mode, onModeChange }: FireFeasibilityFormModeToggleProps) {
  return (
    <SegmentedToggle
      options={[...FIRE_FEASIBILITY_MODE_TOGGLE_OPTIONS]}
      value={mode}
      onChange={(value) => onModeChange(value as FireFeasibilityMode)}
    />
  )
}

export default FireFeasibilityFormModeToggle
