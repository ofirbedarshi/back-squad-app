import type { FireFeasibilityFlightPathResultRow } from '../domain/fireFeasibility.constants'
import type { FireFeasibilityFlightPathPercentByPath } from '../domain/fireFeasibility.types'
import FlightPathPercentColumn from './FlightPathPercentColumn'

interface FireFeasibilityFlightPathResultColumnProps {
  generationLabel: string
  rows: readonly FireFeasibilityFlightPathResultRow[]
  percentByFlightPath: FireFeasibilityFlightPathPercentByPath
}

function FireFeasibilityFlightPathResultColumn({
  generationLabel,
  rows,
  percentByFlightPath,
}: FireFeasibilityFlightPathResultColumnProps) {
  return (
    <FlightPathPercentColumn
      generationLabel={generationLabel}
      rows={rows}
      percentByFlightPath={percentByFlightPath}
    />
  )
}

export default FireFeasibilityFlightPathResultColumn
