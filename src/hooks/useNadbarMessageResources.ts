import { useMemo } from 'react'
import type { NadbarLinks } from '../domain/nadbar.types'
import type { NadbarMessageResources } from '../utils/nadbarMessageFill.types'
import { loadIndicatorsUseCase } from '../useCases/loadIndicators'
import { loadPositionsUseCase } from '../useCases/loadPositions'
import { loadTargetsUseCase } from '../useCases/loadTargets'

export function useNadbarMessageResources(links?: NadbarLinks): NadbarMessageResources {
  return useMemo(() => {
    const indicator = links?.pointerId
      ? loadIndicatorsUseCase().find((item) => item.id === links.pointerId)
      : undefined
    const target = links?.targetId
      ? loadTargetsUseCase().find((item) => item.id === links.targetId)
      : undefined
    const position = links?.positionId
      ? loadPositionsUseCase().find((item) => item.id === links.positionId)
      : undefined

    return { indicator, target, position }
  }, [links?.pointerId, links?.targetId, links?.positionId])
}
