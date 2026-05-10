import { useEffect, useState } from 'react'
import { loadReferencePositionUseCase } from '../useCases/loadReferencePosition'
import { positionEvents, POSITION_EVENTS } from '../shared/positionEvents'
import type { Position } from '../domain/position.types'

export function useReferencePosition(): Position | null {
  const [referencePosition, setReferencePosition] = useState<Position | null>(() => loadReferencePositionUseCase())

  useEffect(() => {
    const refresh = () => {
      setReferencePosition(loadReferencePositionUseCase())
    }

    refresh()
    positionEvents.on(POSITION_EVENTS.CURRENT_CHANGED, refresh)
    positionEvents.on(POSITION_EVENTS.REFERENCE_CHANGED, refresh)

    return () => {
      positionEvents.off(POSITION_EVENTS.CURRENT_CHANGED, refresh)
      positionEvents.off(POSITION_EVENTS.REFERENCE_CHANGED, refresh)
    }
  }, [])

  return referencePosition
}
