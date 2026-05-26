import { useCallback, useEffect, useState } from 'react'
import type { FireFeasibilityFormData, FireFeasibilityMode } from '../domain/fireFeasibility.types'
import { useEntityLinkResources } from './useEntityLinkResources'
import { useFireFeasibilityFlow } from './useFireFeasibilityFlow'
import { getNextStepAfterForm } from './useFireFeasibilityFlow.types'
import { useUIError } from './useUIError'

export function useFireFeasibilityScreen(mode: FireFeasibilityMode) {
  const flow = useFireFeasibilityFlow(mode)
  const { position, target } = useEntityLinkResources({
    targetId: flow.targetId,
    positionId: flow.positionId,
  })
  const { reportUIError } = useUIError()
  const [formData, setFormData] = useState<FireFeasibilityFormData>({
    positionToTargetRange: null,
  })

  useEffect(() => {
    if (flow.step !== 'form') return
    if (!flow.positionId || !position) {
      reportUIError('לא נמצאה עמדה — חזור לשלב הבחירה')
    }
    if (!flow.targetId || !target) {
      reportUIError('לא נמצאה מטרה — חזור לשלב הבחירה')
    }
  }, [flow.step, flow.positionId, position, flow.targetId, target, reportUIError])

  const handleAdvanceFromLinks = useCallback(() => {
    if (!position || !target) return
    flow.advanceFromLinks()
  }, [position, target, flow])

  const handleCalculate = useCallback(() => {
    if (!position || !target) return
    const result = flow.calculateResult()
    if (!result) return
    flow.setResults(result)
    flow.setStep(getNextStepAfterForm())
  }, [position, target, flow])

  const handleUpdateData = useCallback((data: FireFeasibilityFormData) => {
    setFormData(data)
  }, [])

  return {
    flow,
    position,
    target,
    formData,
    handleAdvanceFromLinks,
    handleCalculate,
    handleUpdateData,
  }
}
