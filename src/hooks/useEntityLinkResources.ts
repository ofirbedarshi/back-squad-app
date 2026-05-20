import { useMemo } from 'react'
import type { EntityLinkIds, EntityLinkResources } from '../domain/entityLinks.types'
import { loadIndicatorsUseCase } from '../useCases/loadIndicators'
import { loadPositionsUseCase } from '../useCases/loadPositions'
import { loadTargetsUseCase } from '../useCases/loadTargets'

export function useEntityLinkResources(linkIds?: EntityLinkIds): EntityLinkResources {
  const pointerId = linkIds?.pointerId
  const targetId = linkIds?.targetId
  const positionId = linkIds?.positionId

  return useMemo(() => {
    const indicator = pointerId
      ? loadIndicatorsUseCase().find((item) => item.id === pointerId)
      : undefined
    const target = targetId
      ? loadTargetsUseCase().find((item) => item.id === targetId)
      : undefined
    const position = positionId
      ? loadPositionsUseCase().find((item) => item.id === positionId)
      : undefined

    return { indicator, target, position }
  }, [pointerId, targetId, positionId])
}
