import { useEffect, useState } from 'react'
import { loadCurrentPositionUseCase } from '../useCases/loadCurrentPosition'
import { positionEvents, POSITION_EVENTS } from '../shared/positionEvents'
import type { Position } from '../domain/position.types'

export function useCurrentPosition(): Position | null {
  const [currentPosition, setCurrentPosition] = useState<Position | null>(() => loadCurrentPositionUseCase())

  useEffect(() => {
    const refreshCurrentPosition = () => {
      setCurrentPosition(loadCurrentPositionUseCase())
    }

    refreshCurrentPosition()
    positionEvents.on(POSITION_EVENTS.CURRENT_CHANGED, refreshCurrentPosition)

    return () => {
      positionEvents.off(POSITION_EVENTS.CURRENT_CHANGED, refreshCurrentPosition)
    }
  }, [])

  return currentPosition
}
