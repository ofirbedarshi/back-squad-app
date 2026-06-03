import type { FireFeasibilityFlightPath } from '../domain/fireFeasibility.types'
import FireFeasibilityCloudHeightField from './FireFeasibilityCloudHeightField'
import FlightPathSegmentedField from './FlightPathSegmentedField'

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

      <FlightPathSegmentedField
        value={flightPath}
        onChange={(value) => onFlightPathChange(value as FireFeasibilityFlightPath)}
      />
    </>
  )
}

export default FireFeasibilityFormSharedTail
