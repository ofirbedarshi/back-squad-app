import { useCallback, useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import type {
  FireFeasibilityFormData,
  FireFeasibilityMode,
  FireFeasibilityResults,
} from '../domain/fireFeasibility.types'
import type { EntityLinksUpdate } from '../domain/entityLinks.types'
import { createEmptyFireFeasibilityFormData } from '../domain/fireFeasibility'
import { calculateFireFeasibility } from '../useCases/calculateFireFeasibility'
import { loadCurrentPositionUseCase } from '../useCases/loadCurrentPosition'
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
  const [step, setStep] = useState<FireFeasibilityStep>('form')
  const [targetId, setTargetId] = useState<string | undefined>()
  const [positionId, setPositionId] = useState<string | undefined>()
  const [results, setResults] = useState<FireFeasibilityResults | null>(null)
  const [formData, setFormData] = useState<FireFeasibilityFormData>(createEmptyFireFeasibilityFormData())

  const { position, target } = useEntityLinkResources({
    targetId,
    positionId,
  })

  const hasAutoLoadedCurrentPositionRef = useRef(false)

  useEffect(() => {
    if (hasAutoLoadedCurrentPositionRef.current) return
    hasAutoLoadedCurrentPositionRef.current = true

    const current = loadCurrentPositionUseCase()
    if (current) {
      setPositionId(current.id)
    }
  }, [])

  function updateLinks(links: EntityLinksUpdate) {
    if ('targetId' in links) {
      setTargetId(links.targetId ?? undefined)
    }
    if ('positionId' in links) {
      setPositionId(links.positionId ?? undefined)
    }
  }

  const handleCalculate = useCallback(() => {
    if (mode === 'distances-heights') {
      if (!position) {
        triggerError('יש לטעון עמדה לפני חישוב')
        return
      }
      if (formData.positionToTargetRange === null || formData.positionToTargetHeightDifference === null) {
        triggerError('יש להזין טווח והפרש גובה לפני חישוב')
        return
      }
    } else {
      if (!position || !target) {
        triggerError('יש לטעון מטרה ועמדה לפני חישוב')
        return
      }
    }
    try {
      const result = calculateFireFeasibility(formData)
      setResults(result)
      setStep(getNextStepAfterForm())
    } catch (error) {
      triggerError(error instanceof Error ? error.message : 'חישוב נכשל')
    }
  }, [mode, position, target, formData, triggerError])

  const handleUpdateData = useCallback((data: FireFeasibilityFormData) => {
    setFormData(data)
  }, [])

  const handleSaveResults = useCallback(() => {
    if (!results || !positionId) {
      reportUIError('לא ניתן לשמור — חסרים נתונים')
      return
    }
    try {
      if (mode === 'distances-heights') {
        const range = formData.positionToTargetRange
        const heightDiff = formData.positionToTargetHeightDifference
        if (range === null || heightDiff === null) {
          reportUIError('לא ניתן לשמור — חסר טווח או הפרש גובה')
          return
        }
        saveFireFeasibilityRecordUseCase({
          mode,
          positionId,
          rangeMeters: range,
          heightDifferenceMeters: heightDiff,
          results,
        })
      } else {
        if (!targetId) {
          reportUIError('לא ניתן לשמור — לא נבחרה מטרה')
          return
        }
        saveFireFeasibilityRecordUseCase({
          mode,
          targetId,
          positionId,
          results,
        })
      }
      notifySuccess('התוצאות נשמרו')
      navigate('/fire-feasibility')
    } catch (error) {
      triggerError(error instanceof Error ? error.message : 'שמירת התוצאות נכשלה')
    }
  }, [results, targetId, positionId, mode, formData, notifySuccess, navigate, reportUIError, triggerError])

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
    handleCalculate,
    handleUpdateData,
    handleSaveResults,
  }
}
