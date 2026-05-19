import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import NadbarChatView from '../components/NadbarChatView'
import NadbarLinksToolbar from '../components/NadbarLinksToolbar'
import { useDomainError } from '../hooks/useDomainError'
import { useNadbarTypeRouteParam } from '../hooks/useNadbarTypeRouteParam'
import { useNotification } from '../hooks/useNotification'
import type { Nadbar, NadbarLinksUpdate } from '../domain/nadbar.types'
import { addNadbarUseCase } from '../useCases/addNadbar'
import { applyNadbarLinksToNadbarUseCase } from '../useCases/applyNadbarLinksToNadbar'
import { createNadbarFromTypeUseCase } from '../useCases/createNadbarFromType'
import { getNadbarTypeLabel } from '../utils/nadbarDisplay'

function NadbarNewScreen() {
  const navigate = useNavigate()
  const nadbarType = useNadbarTypeRouteParam()
  const { notifySuccess } = useNotification()
  const { triggerError } = useDomainError()
  const [draftNadbar, setDraftNadbar] = useState<Nadbar | null>(null)

  useEffect(() => {
    if (nadbarType) {
      setDraftNadbar(createNadbarFromTypeUseCase(nadbarType))
    }
  }, [nadbarType])

  if (!nadbarType || !draftNadbar) {
    return null
  }

  function saveLinks(links: NadbarLinksUpdate) {
    try {
      setDraftNadbar((current) => (current ? applyNadbarLinksToNadbarUseCase(current, links) : current))
    } catch (error) {
      triggerError(error instanceof Error ? error.message : 'עדכון קישורים נכשל')
    }
  }

  function handleSave() {
    if (!draftNadbar) return
    addNadbarUseCase(draftNadbar)
    notifySuccess('הנדבר נשמר')
    navigate('/nadbarim')
  }

  return (
    <div dir="rtl" className="flex flex-col bg-neutral-50 min-h-full">
      <header className="sticky top-0 z-10 bg-white px-4 py-3 flex items-center gap-2 border-b border-neutral-200 shrink-0">
        <button
          type="button"
          onClick={() => navigate('/nadbarim')}
          className="text-sm font-semibold text-blue-600 active:opacity-70 touch-manipulation shrink-0"
        >
          חזור
        </button>
        <span className="flex-1 text-center font-bold text-lg text-neutral-800 truncate px-1 min-w-0">
          הוסף · {getNadbarTypeLabel(nadbarType)}
        </span>
        <div className="flex items-center gap-1 shrink-0">
          <NadbarLinksToolbar
            pointerId={draftNadbar.links?.pointerId}
            targetId={draftNadbar.links?.targetId}
            onLinksChange={saveLinks}
          />
          <button
            type="button"
            onClick={handleSave}
            className="text-sm font-bold text-white bg-blue-600 rounded-xl px-3 py-1.5 active:bg-blue-700 touch-manipulation"
          >
            שמור
          </button>
        </div>
      </header>

      <div className="flex-1 overflow-y-auto">
        <NadbarChatView messages={draftNadbar.messages} />
      </div>
    </div>
  )
}

export default NadbarNewScreen
