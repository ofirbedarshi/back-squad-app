import { useCallback, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { getNadbarBlockMessageVars } from '../domain/nadbar'
import type { Nadbar, NadbarLinksUpdate } from '../domain/nadbar.types'
import { applyNadbarLinksToNadbarUseCase } from '../useCases/applyNadbarLinksToNadbar'
import { assertNadbarSaveableUseCase } from '../useCases/assertNadbarSaveable'
import { getNadbarByIdUseCase } from '../useCases/getNadbarById'
import { updateNadbarUseCase } from '../useCases/updateNadbar'
import { useDomainError } from './useDomainError'
import { useNadbarBlockAddObstacleHandler } from './useNadbarBlockAddObstacleHandler'
import { useNadbarBlockFooterActionHandler } from './useNadbarBlockFooterActionHandler'
import { useNadbarBlockLoadTargetHandler } from './useNadbarBlockLoadTargetHandler'
import { useNadbarBlockUserVarChange } from './useNadbarBlockUserVarChange'
import { useNadbarNotesChange } from './useNadbarNotesChange'
import { useNotification } from './useNotification'

export function useNadbarEditFlow(id: string | undefined) {
  const navigate = useNavigate()
  const { triggerError } = useDomainError()
  const { notifySuccess } = useNotification()
  const [draftNadbar, setDraftNadbar] = useState<Nadbar | undefined>(() =>
    id ? getNadbarByIdUseCase(id) : undefined,
  )

  const getMessageVars = useCallback(
    (blockIndex: number) => (draftNadbar ? getNadbarBlockMessageVars(draftNadbar, blockIndex) : undefined),
    [draftNadbar],
  )
  const handleBlockFooterAction = useNadbarBlockFooterActionHandler(getMessageVars)
  const { blockLoadedTargetIds, handleLoadTarget, handleClearLoadedTarget } =
    useNadbarBlockLoadTargetHandler(draftNadbar, setDraftNadbar)
  const { handleAddObstacle } = useNadbarBlockAddObstacleHandler(draftNadbar, setDraftNadbar)
  const setUserVar = useNadbarBlockUserVarChange(setDraftNadbar)
  const setNotes = useNadbarNotesChange(setDraftNadbar)

  useEffect(() => {
    if (!draftNadbar) {
      triggerError('הנדבר המבוקש לא נמצא')
      navigate('/nadbarim', { replace: true })
    }
  }, [draftNadbar, navigate, triggerError])

  function updateDraftLinks(links: NadbarLinksUpdate) {
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
      updateNadbarUseCase(draftNadbar)
      notifySuccess('הנדבר נשמר')
      navigate('/nadbarim')
    } catch (error) {
      triggerError(error instanceof Error ? error.message : 'שמירת הנדבר נכשלה')
    }
  }

  return {
    draftNadbar,
    setUserVar,
    setNotes,
    updateDraftLinks,
    saveNadbar,
    handleBlockFooterAction,
    blockLoadedTargetIds,
    handleLoadTarget,
    handleClearLoadedTarget,
    handleAddObstacle,
  }
}
