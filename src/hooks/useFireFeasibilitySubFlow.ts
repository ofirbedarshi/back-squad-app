import { useState } from 'react'
import type { EntityLinksUpdate } from '../domain/entityLinks.types'
import type { FireFeasibilitySubStep } from './useFireFeasibilitySubFlow.types'

export function useFireFeasibilitySubFlow() {
  const [step, setStep] = useState<FireFeasibilitySubStep>('links')
  const [targetId, setTargetId] = useState<string | undefined>()
  const [positionId, setPositionId] = useState<string | undefined>()

  function updateLinks(links: EntityLinksUpdate) {
    if ('targetId' in links) {
      setTargetId(links.targetId ?? undefined)
    }
    if ('positionId' in links) {
      setPositionId(links.positionId ?? undefined)
    }
  }

  function advanceFromLinksStep() {
    if (!targetId || !positionId) return
    setStep('content')
  }

  return {
    step,
    targetId,
    positionId,
    updateLinks,
    advanceFromLinksStep,
  }
}
