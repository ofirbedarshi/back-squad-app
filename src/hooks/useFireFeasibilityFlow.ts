import { useCallback, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import type {
  FireFeasibilityFormData,
  FireFeasibilityMode,
  FireFeasibilityResults,
} from '../domain/fireFeasibility.types'
import type { EntityLinksUpdate } from '../domain/entityLinks.types'
import { calculateFireFeasibility } from '../useCases/calculateFireFeasibility'
import { saveFireFeasibilityRecordUseCase } from '../useCases/saveFireFeasibilityRecord'
import { useDomainError } from './useDomainError'
import { useEntityLinkResources } from './useEntityLinkResources'
import { getNextStepAfterForm } from './useFireFeasibilityFlow.types'
import type { FireFeasibilityStep } from './useFireFeasibilityFlow.types'
import { useNotification } from './useNotification'
import { useUIError } from './useUIError'

export function useFireFeasibilityFlow() {
  const navigate = useNavigate()
  const { triggerError } = useDomainError()
  const { reportUIError } = useUIError()
  const { notifySuccess } = useNotification()
  const [mode, setMode] = useState<FireFeasibilityMode>('coords')
  const [step, setStep] = useState<FireFeasibilityStep>('links')
  const [targetId, setTargetId] = useState<string | undefined>()
  const [positionId, setPositionId] = useState<string | undefined>()
  const [results, setResults] = useState<FireFeasibilityResults | null>(null)
  const [formData, setFormData] = useState<FireFeasibilityFormData>({
    positionToTargetRange: null,
    positionToTargetHeightDifference: null,
    targetAltitudeMeters: null,
    flightPath: 'flat',
  })

  const { position, target } = useEntityLinkResources({
    targetId,
    positionId,
  })

  useEffect(() => {
    if (step !== 'form') return
    if (!positionId || !position) {
      reportUIError('לא נמצאה עמדה — חזור לשלב הבחירה')
    }
    if (!targetId || !target) {
      reportUIError('לא נמצאה מטרה — חזור לשלב הבחירה')
    }
  }, [step, positionId, position, targetId, target, reportUIError])

  function updateLinks(links: EntityLinksUpdate) {
    if ('targetId' in links) {
      setTargetId(links.targetId ?? undefined)
    }
    if ('positionId' in links) {
      setPositionId(links.positionId ?? undefined)
    }
  }

  const handleAdvanceFromLinks = useCallback(() => {
    if (!position || !target || !targetId || !positionId) return
    setStep('form')
  }, [position, target, targetId, positionId])

  const handleCalculate = useCallback(() => {
    if (!position || !target) return
    try {
      const result = calculateFireFeasibility(formData)
      setResults(result)
      setStep(getNextStepAfterForm())
    } catch (error) {
      triggerError(error instanceof Error ? error.message : 'חישוב נכשל')
    }
  }, [position, target, formData, triggerError])

  const handleUpdateData = useCallback((data: FireFeasibilityFormData) => {
    setFormData(data)
  }, [])

  const handleSaveResults = useCallback(() => {
    if (!results || !targetId || !positionId) {
      reportUIError('לא ניתן לשמור — חסרים נתונים')
      return
    }
    try {
      saveFireFeasibilityRecordUseCase({
        mode,
        targetId,
        positionId,
        results,
      })
      notifySuccess('התוצאות נשמרו')
      navigate('/fire-feasibility')
    } catch (error) {
      triggerError(error instanceof Error ? error.message : 'שמירת התוצאות נכשלה')
    }
  }, [results, targetId, positionId, mode, notifySuccess, navigate, reportUIError, triggerError])

  return {
    mode,
    setMode,
    step,
    targetId,
    positionId,
    results,
    updateLinks,
    position,
    target,
    formData,
    handleAdvanceFromLinks,
    handleCalculate,
    handleUpdateData,
    handleSaveResults,
  }
}
