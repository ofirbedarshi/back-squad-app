import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import NadbarChatView from '../components/NadbarChatView'
import NadbarLinksToolbar from '../components/NadbarLinksToolbar'
import { useDomainError } from '../hooks/useDomainError'
import type { Nadbar, NadbarLinksUpdate } from '../domain/nadbar.types'
import { getNadbarByIdUseCase } from '../useCases/getNadbarById'
import { updateNadbarLinksUseCase } from '../useCases/updateNadbarLinks'
import { getNadbarCardTitle, getNadbarTypeLabel } from '../utils/nadbarDisplay'

function NadbarEditScreen() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { triggerError } = useDomainError()
  const [nadbar, setNadbar] = useState<Nadbar | undefined>(() => (id ? getNadbarByIdUseCase(id) : undefined))

  useEffect(() => {
    if (!nadbar) {
      triggerError('הנדבר המבוקש לא נמצא')
      navigate('/nadbarim', { replace: true })
    }
  }, [nadbar, navigate, triggerError])

  function saveLinks(links: NadbarLinksUpdate) {
    if (!nadbar) return
    try {
      const updated = updateNadbarLinksUseCase(nadbar.id, links)
      setNadbar(updated)
    } catch (error) {
      triggerError(error instanceof Error ? error.message : 'שמירת הנדבר נכשלה')
    }
  }

  if (!nadbar) {
    return null
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
          {getNadbarCardTitle(nadbar)}
        </span>
        <NadbarLinksToolbar
          replaceMode
          pointerId={nadbar.links?.pointerId}
          targetId={nadbar.links?.targetId}
          positionId={nadbar.links?.positionId}
          onLinksChange={saveLinks}
        />
      </header>

      <p className="text-center text-xs text-neutral-500 py-2 bg-white border-b border-neutral-100">
        {getNadbarTypeLabel(nadbar.type)}
      </p>

      <div className="flex-1 overflow-y-auto">
        <NadbarChatView messages={nadbar.messages} links={nadbar.links} />
      </div>
    </div>
  )
}

export default NadbarEditScreen
