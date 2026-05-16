import { useMemo } from 'react'
import type { UseFormWatch } from 'react-hook-form'
import { calculateIndicatorToTargetMetricsUseCase } from '../useCases/calculateIndicatorToTargetMetrics'
import type { CoordinateValue, FormValues } from '../domain/dynamicForm.types'
import type { PositionCoordinates } from '../domain/position.types'
import type { IndicatorToTargetMetrics } from '../domain/indicatorToTargetMetrics.types'

function toPositionCoordinates(value: unknown): PositionCoordinates | undefined {
  if (typeof value !== 'object' || value === null) {
    return undefined
  }

  const coords = value as CoordinateValue
  return {
    east: coords.east ?? '',
    north: coords.north ?? '',
    palach: coords.palach ?? '',
  }
}

export function useIndicatorToTargetMetrics(watch: UseFormWatch<FormValues>): IndicatorToTargetMetrics | null {
  const targetId = watch('targetId') as string | undefined
  const indicatorId = watch('indicatorId') as string | undefined
  const indicatorCoordinates = toPositionCoordinates(watch('indicatorPositionCoords'))
  const targetCoordinates = toPositionCoordinates(watch('targetCoords'))
  const indicatorAltitude = watch('indicatorAltitude') as string | number | undefined
  const targetAltitude = watch('targetAltitude') as string | number | undefined

  return useMemo(
    () =>
      calculateIndicatorToTargetMetricsUseCase({
        targetId,
        indicatorId,
        indicatorCoordinates,
        indicatorAltitude,
        targetCoordinates,
        targetAltitude,
      }),
    [
      targetId,
      indicatorId,
      indicatorCoordinates?.east,
      indicatorCoordinates?.north,
      indicatorCoordinates?.palach,
      indicatorAltitude,
      targetCoordinates?.east,
      targetCoordinates?.north,
      targetCoordinates?.palach,
      targetAltitude,
    ]
  )
}
