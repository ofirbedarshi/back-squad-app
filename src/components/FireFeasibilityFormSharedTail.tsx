import { useState } from 'react'
import { FLIGHT_PATH_OPTIONS } from '../domain/fireFeasibility.constants'
import FireFeasibilityCloudHeightField from './FireFeasibilityCloudHeightField'
import SegmentedToggle from './base/SegmentedToggle'
import FormField from './FormField'

function FireFeasibilityFormSharedTail() {
  const [flightPath, setFlightPath] = useState('flat')

  return (
    <>
      <FireFeasibilityCloudHeightField />

      <FormField label="מסלול מעוף">
        <SegmentedToggle
          options={[...FLIGHT_PATH_OPTIONS]}
          value={flightPath}
          onChange={setFlightPath}
        />
      </FormField>
    </>
  )
}

export default FireFeasibilityFormSharedTail
