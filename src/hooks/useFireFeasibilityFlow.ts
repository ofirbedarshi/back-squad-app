import { useCallback, useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import {
  createEmptyFireFeasibilityFormData,
  getFireFeasibilityFlowInitFromRecord,
} from '../domain/fireFeasibility'
import type {
  FireFeasibilityFormData,
  FireFeasibilityMode,
  FireFeasibilityResults,
} from '../domain/fireFeasibility.types'
import { calculateFireFeasibility } from '../useCases/calculateFireFeasibility'
import { getFireFeasibilityRecordByIdUseCase } from '../useCases/getFireFeasibilityRecordById'
import { loadCurrentPositionUseCase } from '../useCases/loadCurrentPosition'
import { saveFireFeasibilityRecordUseCase } from '../useCases/saveFireFeasibilityRecord'
import { updateFireFeasibilityRecordUseCase } from '../useCases/updateFireFeasibilityRecord'
import { useDomainError } from './useDomainError'
import { useEntityLinkResources } from './useEntityLinkResources'
import { getNextStepAfterForm } from './useFireFeasibilityFlow.types'
import type { FireFeasibilityStep } from './useFireFeasibilityFlow.types'
import { useNotification } from './useNotification'
import { useUIError } from './useUIError'

export function useFireFeasibilityFlow(editRecordId?: string) {
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
  const [isEditReady, setIsEditReady] = useState(!editRecordId)

  const { position, target } = useEntityLinkResources({
    targetId,
    positionId,
  })

  const hasAutoLoadedCurrentPositionRef = useRef(false)
  const hasInitializedEditRef = useRef(false)

  useEffect(() => {
    if (!editRecordId || hasInitializedEditRef.current) {
      return
    }
    hasInitializedEditRef.current = true

    const record = getFireFeasibilityRecordByIdUseCase(editRecordId)
    if (!record) {
      reportUIError('הרשומה לא נמצאה')
      navigate('/fire-feasibility')
      return
    }

    const init = getFireFeasibilityFlowInitFromRecord(record)
    setMode(init.mode)
    setPositionId(init.positionId)
    setTargetId(init.targetId)
    setFormData(init.formData)
    setIsEditReady(true)
  }, [editRecordId, navigate, reportUIError])

  useEffect(() => {
    if (editRecordId || hasAutoLoadedCurrentPositionRef.current) {
      return
    }
    hasAutoLoadedCurrentPositionRef.current = true

    const current = loadCurrentPositionUseCase()
    if (current) {
      setPositionId(current.id)
    }
  }, [editRecordId])

  const handleCalculate = useCallback(() => {
    if (!position) {
      triggerError('יש לטעון עמדה לפני חישוב')
      return
    }
    if (formData.positionToTargetRange === null || formData.positionToTargetHeightDifference === null) {
      triggerError('יש להזין טווח והפרש גובה לפני חישוב')
      return
    }
    try {
      const result = calculateFireFeasibility(formData)
      setResults(result)
      setStep(getNextStepAfterForm())
    } catch (error) {
      triggerError(error instanceof Error ? error.message : 'חישוב נכשל')
    }
  }, [position, formData, triggerError])

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
        const input = {
          mode,
          positionId,
          rangeMeters: range,
          heightDifferenceMeters: heightDiff,
          formData,
          results,
        } as const
        if (editRecordId) {
          updateFireFeasibilityRecordUseCase(editRecordId, input)
        } else {
          saveFireFeasibilityRecordUseCase(input)
        }
      } else {
        if (!targetId) {
          reportUIError('לא ניתן לשמור — לא נבחרה מטרה')
          return
        }
        const input = {
          mode,
          targetId,
          positionId,
          formData,
          results,
        } as const
        if (editRecordId) {
          updateFireFeasibilityRecordUseCase(editRecordId, input)
        } else {
          saveFireFeasibilityRecordUseCase(input)
        }
      }
      notifySuccess(editRecordId ? 'התוצאות עודכנו' : 'התוצאות נשמרו')
      navigate('/fire-feasibility')
    } catch (error) {
      triggerError(error instanceof Error ? error.message : 'שמירת התוצאות נכשלה')
    }
  }, [
    results,
    targetId,
    positionId,
    mode,
    formData,
    editRecordId,
    notifySuccess,
    navigate,
    reportUIError,
    triggerError,
  ])

  const handleBackToForm = useCallback(() => {
    setStep('form')
  }, [])

  return {
    editRecordId,
    isEditReady,
    mode,
    setMode,
    step,
    targetId,
    positionId,
    setTargetId,
    setPositionId,
    results,
    position,
    target,
    formData,
    handleCalculate,
    handleUpdateData,
    handleSaveResults,
    handleBackToForm,
  }
}
