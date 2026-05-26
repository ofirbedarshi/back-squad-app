import { FLIGHT_PATH_OPTIONS } from '../domain/fireFeasibility.constants'
import type { FireFeasibilityFlightPath } from '../domain/fireFeasibility.types'
import FireFeasibilityCloudHeightField from './FireFeasibilityCloudHeightField'
import SegmentedToggle from './base/SegmentedToggle'
import FormField from './FormField'

interface FireFeasibilityFormSharedTailProps {
  flightPath: FireFeasibilityFlightPath
  onFlightPathChange: (flightPath: FireFeasibilityFlightPath) => void
}

function FireFeasibilityFormSharedTail({
  flightPath,
  onFlightPathChange,
}: FireFeasibilityFormSharedTailProps) {
  return (
    <>
      <FireFeasibilityCloudHeightField />

      <FormField label="מסלול מעוף">
        <SegmentedToggle
          options={[...FLIGHT_PATH_OPTIONS]}
          value={flightPath}
          onChange={(value) => onFlightPathChange(value as FireFeasibilityFlightPath)}
        />
      </FormField>
    </>
  )
}

export default FireFeasibilityFormSharedTail
