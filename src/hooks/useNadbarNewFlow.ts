import { useCallback, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getNadbarBlockMessageVars, nadbarRequiresEntityLinks, updateNadbarBlockMessageVar } from '../domain/nadbar'
import type { Nadbar, NadbarLinksUpdate } from '../domain/nadbar.types'
import { addNadbarUseCase } from '../useCases/addNadbar'
import { assertNadbarSaveableUseCase } from '../useCases/assertNadbarSaveable'
import { applyNadbarLinksToNadbarUseCase } from '../useCases/applyNadbarLinksToNadbar'
import { createNadbarFromTypeUseCase } from '../useCases/createNadbarFromType'
import { useDomainError } from './useDomainError'
import { useNadbarBlockFooterActionHandler } from './useNadbarBlockFooterActionHandler'
import { useNadbarBlockLoadTargetHandler } from './useNadbarBlockLoadTargetHandler'
import { useNadbarTypeRouteParam } from './useNadbarTypeRouteParam'
import { useNotification } from './useNotification'
import type { NewNadbarStep } from './useNadbarNewFlow.types'

export function useNadbarNewFlow() {
  const nadbarType = useNadbarTypeRouteParam()
  const navigate = useNavigate()
  const { notifySuccess } = useNotification()
  const { triggerError } = useDomainError()
  const [step, setStep] = useState<NewNadbarStep>('links')
  const [pointerId, setPointerId] = useState<string | undefined>()
  const [targetId, setTargetId] = useState<string | undefined>()
  const [positionId, setPositionId] = useState<string | undefined>()
  const [draftNadbar, setDraftNadbar] = useState<Nadbar | null>(null)

  const getMessageVars = useCallback(
    (blockIndex: number) => (draftNadbar ? getNadbarBlockMessageVars(draftNadbar, blockIndex) : undefined),
    [draftNadbar],
  )
  const handleBlockFooterAction = useNadbarBlockFooterActionHandler(getMessageVars)
  const { blockLoadedTargetIds, handleLoadTarget, handleClearLoadedTarget } =
    useNadbarBlockLoadTargetHandler(draftNadbar, setDraftNadbar)

  useEffect(() => {
    if (!nadbarType) return

    if (!nadbarRequiresEntityLinks(nadbarType)) {
      setStep('chat')
      setPointerId(undefined)
      setTargetId(undefined)
      setPositionId(undefined)
      try {
        setDraftNadbar(createNadbarFromTypeUseCase(nadbarType))
      } catch (error) {
        triggerError(error instanceof Error ? error.message : 'יצירת הנדבר נכשלה')
      }
      return
    }

    setStep('links')
    setDraftNadbar(null)
    // triggerError intentionally omitted — unstable reference caused draft reset every render
  }, [nadbarType])

  function updateLinkIds(links: NadbarLinksUpdate) {
    if ('pointerId' in links) {
      setPointerId(links.pointerId ?? undefined)
    }
    if ('targetId' in links) {
      setTargetId(links.targetId ?? undefined)
    }
    if ('positionId' in links) {
      setPositionId(links.positionId ?? undefined)
    }
  }

  function advanceFromLinksStep() {
    if (!nadbarType || !pointerId || !targetId || !positionId) return
    try {
      const base = createNadbarFromTypeUseCase(nadbarType)
      const withLinks = applyNadbarLinksToNadbarUseCase(base, { pointerId, targetId, positionId })
      setDraftNadbar(withLinks)
      setStep('chat')
    } catch (error) {
      triggerError(error instanceof Error ? error.message : 'יצירת הנדבר נכשלה')
    }
  }

  function setUserVar(blockIndex: number, varName: string, value: string) {
    setDraftNadbar((current) =>
      current ? updateNadbarBlockMessageVar(current, blockIndex, varName, value) : current,
    )
  }

  function saveDraftLinks(links: NadbarLinksUpdate) {
    updateLinkIds(links)
    try {
      setDraftNadbar((current) => (current ? applyNadbarLinksToNadbarUseCase(current, links) : current))
    } catch (error) {
      triggerError(error instanceof Error ? error.message : 'עדכון קישורים נכשל')
    }
  }

  function saveNadbar() {
    if (!draftNadbar) return
    try {
      assertNadbarSaveableUseCase(draftNadbar)
      addNadbarUseCase(draftNadbar)
      notifySuccess('הנדבר נשמר')
      navigate('/nadbarim')
    } catch (error) {
      triggerError(error instanceof Error ? error.message : 'שמירת הנדבר נכשלה')
    }
  }

  return {
    nadbarType,
    step,
    pointerId,
    targetId,
    positionId,
    draftNadbar,
    setUserVar,
    updateLinkIds,
    advanceFromLinksStep,
    saveDraftLinks,
    saveNadbar,
    handleBlockFooterAction,
    blockLoadedTargetIds,
    handleLoadTarget,
    handleClearLoadedTarget,
  }
}
