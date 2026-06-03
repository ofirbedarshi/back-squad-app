import { useMemo } from 'react'
import type { UseFormWatch } from 'react-hook-form'
import { calculateIndicatorToTargetMetricsUseCase } from '../useCases/calculateIndicatorToTargetMetrics'
import type {
  CoordinateValue,
  FormValues,
  IndicatorToTargetWatchKeyOverrides,
} from '../domain/dynamicForm.types'
import type { PositionCoordinates } from '../domain/position.types'
import type { IndicatorToTargetMetrics } from '../domain/indicatorToTargetMetrics.types'

const DEFAULT_INDICATOR_TO_TARGET_WATCH_KEYS = {
  targetId: 'targetId',
  indicatorId: 'indicatorId',
  indicatorCoords: 'indicatorPositionCoords',
  indicatorAltitude: 'indicatorAltitude',
  targetCoords: 'targetCoords',
  targetAltitude: 'targetAltitude',
} as const

function resolveWatchKeys(overrides?: IndicatorToTargetWatchKeyOverrides) {
  return {
    targetId: overrides?.targetId ?? DEFAULT_INDICATOR_TO_TARGET_WATCH_KEYS.targetId,
    indicatorId: overrides?.indicatorId ?? DEFAULT_INDICATOR_TO_TARGET_WATCH_KEYS.indicatorId,
    indicatorCoords: overrides?.indicatorCoords ?? DEFAULT_INDICATOR_TO_TARGET_WATCH_KEYS.indicatorCoords,
    indicatorAltitude:
      overrides?.indicatorAltitude ?? DEFAULT_INDICATOR_TO_TARGET_WATCH_KEYS.indicatorAltitude,
    targetCoords: overrides?.targetCoords ?? DEFAULT_INDICATOR_TO_TARGET_WATCH_KEYS.targetCoords,
    targetAltitude: overrides?.targetAltitude ?? DEFAULT_INDICATOR_TO_TARGET_WATCH_KEYS.targetAltitude,
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

export function useIndicatorToTargetMetrics(
  watch: UseFormWatch<FormValues>,
  keyOverrides?: IndicatorToTargetWatchKeyOverrides,
): IndicatorToTargetMetrics | null {
  const keys = resolveWatchKeys(keyOverrides)
  const targetId = watch(keys.targetId) as string | undefined
  const indicatorId = watch(keys.indicatorId) as string | undefined
  const indicatorCoordinates = toPositionCoordinates(watch(keys.indicatorCoords))
  const targetCoordinates = toPositionCoordinates(watch(keys.targetCoords))
  const indicatorAltitude = watch(keys.indicatorAltitude) as string | number | undefined
  const targetAltitude = watch(keys.targetAltitude) as string | number | undefined

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
    ],
  )
}
