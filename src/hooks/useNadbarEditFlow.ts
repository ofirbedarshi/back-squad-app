import { useCallback, useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import type { Nadbar, NadbarLinksUpdate } from '../domain/nadbar.types'
import { applyNadbarLinksToNadbarUseCase } from '../useCases/applyNadbarLinksToNadbar'
import { assertNadbarSaveableUseCase } from '../useCases/assertNadbarSaveable'
import { getNadbarByIdUseCase } from '../useCases/getNadbarById'
import { updateNadbarUseCase } from '../useCases/updateNadbar'
import { useDomainError } from './useDomainError'
import { useNadbarBlockFooterActionHandler } from './useNadbarBlockFooterActionHandler'
import { useNotification } from './useNotification'

export function useNadbarEditFlow(id: string | undefined) {
  const navigate = useNavigate()
  const { triggerError } = useDomainError()
  const { notifySuccess } = useNotification()
  const [draftNadbar, setDraftNadbar] = useState<Nadbar | undefined>(() =>
    id ? getNadbarByIdUseCase(id) : undefined,
  )

  const getMessageVars = useCallback(() => draftNadbar?.messageVars ?? {}, [draftNadbar])
  const handleBlockFooterAction = useNadbarBlockFooterActionHandler(getMessageVars)

  useEffect(() => {
    if (!draftNadbar) {
      triggerError('הנדבר המבוקש לא נמצא')
      navigate('/nadbarim', { replace: true })
    }
  }, [draftNadbar, navigate, triggerError])

  function setUserVar(varName: string, value: string) {
    setDraftNadbar((current) =>
      current
        ? {
            ...current,
            messageVars: { ...current.messageVars, [varName]: value },
          }
        : current,
    )
  }

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
    updateDraftLinks,
    saveNadbar,
    handleBlockFooterAction,
  }
}
