import { useMemo } from 'react'
import type { UseFormWatch } from 'react-hook-form'
import { calculatePositionToTargetMetricsUseCase } from '../useCases/calculatePositionToTargetMetrics'
import type { CoordinateValue, FormValues } from '../domain/dynamicForm.types'
import type { PositionCoordinates } from '../domain/position.types'
import type { PositionToTargetMetrics } from '../domain/positionToTargetMetrics.types'

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

export function usePositionToTargetMetrics(watch: UseFormWatch<FormValues>): PositionToTargetMetrics | null {
  const targetId = watch('targetId') as string | undefined
  const positionId = watch('rearPositionId') as string | undefined
  const positionCoordinates = toPositionCoordinates(watch('positionCoords'))
  const targetCoordinates = toPositionCoordinates(watch('targetCoords'))
  const positionAltitude = watch('positionAltitude') as string | number | undefined
  const targetAltitude = watch('targetAltitude') as string | number | undefined

  return useMemo(
    () =>
      calculatePositionToTargetMetricsUseCase({
        targetId,
        positionId,
        positionCoordinates,
        positionAltitude,
        targetCoordinates,
        targetAltitude,
      }),
    [
      targetId,
      positionId,
      positionCoordinates?.east,
      positionCoordinates?.north,
      positionCoordinates?.palach,
      positionAltitude,
      targetCoordinates?.east,
      targetCoordinates?.north,
      targetCoordinates?.palach,
      targetAltitude,
    ],
  )
}
