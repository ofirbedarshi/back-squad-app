import { useState } from 'react'
import type { FireFeasibilityMode, FireFeasibilityResults } from '../domain/fireFeasibility.types'
import type { EntityLinksUpdate } from '../domain/entityLinks.types'
import { calculateFireFeasibility } from '../useCases/calculateFireFeasibility'
import { useDomainError } from './useDomainError'
import type { FireFeasibilityStep } from './useFireFeasibilityFlow.types'

export function useFireFeasibilityFlow(mode: FireFeasibilityMode) {
  const { triggerError } = useDomainError()
  const [step, setStep] = useState<FireFeasibilityStep>('links')
  const [targetId, setTargetId] = useState<string | undefined>()
  const [positionId, setPositionId] = useState<string | undefined>()
  const [results, setResults] = useState<FireFeasibilityResults | null>(null)

  function updateLinks(links: EntityLinksUpdate) {
    if ('targetId' in links) {
      setTargetId(links.targetId ?? undefined)
    }
    if ('positionId' in links) {
      setPositionId(links.positionId ?? undefined)
    }
  }

  function advanceFromLinks() {
    if (!targetId || !positionId) return
    setStep('form')
  }

  function calculateResult(): FireFeasibilityResults | null {
    try {
      return calculateFireFeasibility()
    } catch (error) {
      triggerError(error instanceof Error ? error.message : 'חישוב נכשל')
      return null
    }
  }

  return {
    mode,
    step,
    setStep,
    targetId,
    positionId,
    results,
    setResults,
    updateLinks,
    advanceFromLinks,
    calculateResult,
  }
}
