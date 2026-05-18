import { useMemo } from 'react'
import type { UseFormWatch } from 'react-hook-form'
import type { CoordinateValue, FormValues, PositionToTargetWatchKeyOverrides } from '../domain/dynamicForm.types'
import type { PositionCoordinates } from '../domain/position.types'
import type { PositionToTargetMetrics } from '../domain/positionToTargetMetrics.types'
import { calculatePositionToTargetMetricsUseCase } from '../useCases/calculatePositionToTargetMetrics'

const DEFAULT_POSITION_TO_TARGET_WATCH_KEYS = {
  targetId: 'targetId',
  positionId: 'rearPositionId',
  positionCoords: 'positionCoords',
  positionAltitude: 'positionAltitude',
  targetCoords: 'targetCoords',
  targetAltitude: 'targetAltitude',
} as const

function resolveWatchKeys(overrides?: PositionToTargetWatchKeyOverrides) {
  return {
    targetId: overrides?.targetId ?? DEFAULT_POSITION_TO_TARGET_WATCH_KEYS.targetId,
    positionId: overrides?.positionId ?? DEFAULT_POSITION_TO_TARGET_WATCH_KEYS.positionId,
    positionCoords: overrides?.positionCoords ?? DEFAULT_POSITION_TO_TARGET_WATCH_KEYS.positionCoords,
    positionAltitude: overrides?.positionAltitude ?? DEFAULT_POSITION_TO_TARGET_WATCH_KEYS.positionAltitude,
    targetCoords: overrides?.targetCoords ?? DEFAULT_POSITION_TO_TARGET_WATCH_KEYS.targetCoords,
    targetAltitude: overrides?.targetAltitude ?? DEFAULT_POSITION_TO_TARGET_WATCH_KEYS.targetAltitude,
  }
}

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

/** Watches form keys (Bach defaults, or merges `keyOverrides`) and runs `calculatePositionToTargetMetricsUseCase`. */
export function usePositionToTargetMetrics(
  watch: UseFormWatch<FormValues>,
  keyOverrides?: PositionToTargetWatchKeyOverrides,
): PositionToTargetMetrics | null {
  const keys = resolveWatchKeys(keyOverrides)
  const targetId = watch(keys.targetId) as string | undefined
  const positionId = watch(keys.positionId) as string | undefined
  const positionCoordinates = toPositionCoordinates(watch(keys.positionCoords))
  const targetCoordinates = toPositionCoordinates(watch(keys.targetCoords))
  const positionAltitude = watch(keys.positionAltitude) as string | number | undefined
  const targetAltitude = watch(keys.targetAltitude) as string | number | undefined

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
