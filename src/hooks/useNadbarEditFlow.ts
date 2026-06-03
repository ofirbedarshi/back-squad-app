import { useEffect, useMemo, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import type { Nadbar, NadbarLinksUpdate } from '../domain/nadbar.types'
import { applyNadbarLinksToNadbarUseCase } from '../useCases/applyNadbarLinksToNadbar'
import { assertNadbarSaveableUseCase } from '../useCases/assertNadbarSaveable'
import { getNadbarByIdUseCase } from '../useCases/getNadbarById'
import { getNadbarChatTemplateUseCase } from '../useCases/getNadbarChatTemplate'
import { updateNadbarUseCase } from '../useCases/updateNadbar'
import { useDomainError } from './useDomainError'
import { useNadbarBlockAddObstacleHandler } from './useNadbarBlockAddObstacleHandler'
import { useNadbarBlockFooterActionHandler } from './useNadbarBlockFooterActionHandler'
import { useNadbarGlobalLoadTargetHandler } from './useNadbarGlobalLoadTargetHandler'
import { useNadbarBlockUserVarChange } from './useNadbarBlockUserVarChange'
import { useNadbarNotesChange } from './useNadbarNotesChange'
import { nadbarTemplateHasLoadTarget } from '../utils/nadbarMessageFill'
import { useNotification } from './useNotification'

export function useNadbarEditFlow(id: string | undefined) {
  const navigate = useNavigate()
  const { triggerError } = useDomainError()
  const { notifySuccess } = useNotification()
  const [draftNadbar, setDraftNadbar] = useState<Nadbar | undefined>(() =>
    id ? getNadbarByIdUseCase(id) : undefined,
  )

  const handleBlockFooterAction = useNadbarBlockFooterActionHandler(draftNadbar, setDraftNadbar)
  const blockFooterActions = useMemo(
    () =>
      draftNadbar ? getNadbarChatTemplateUseCase(draftNadbar.type).blockFooterActions : undefined,
    [draftNadbar?.type],
  )
  const showGlobalTargetLoad = useMemo(
    () => nadbarTemplateHasLoadTarget(blockFooterActions),
    [blockFooterActions],
  )
  const { loadedTargetId, handleLoadTarget, handleClearLoadedTarget } =
    useNadbarGlobalLoadTargetHandler(draftNadbar, setDraftNadbar, blockFooterActions)
  const { handleAddObstacle } = useNadbarBlockAddObstacleHandler(draftNadbar, setDraftNadbar)
  const setUserVar = useNadbarBlockUserVarChange(setDraftNadbar, blockFooterActions)
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
    showGlobalTargetLoad,
    loadedTargetId,
    handleLoadTarget,
    handleClearLoadedTarget,
    handleAddObstacle,
  }
}
