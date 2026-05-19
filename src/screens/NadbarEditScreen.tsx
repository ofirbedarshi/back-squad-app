import { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useDomainError } from '../hooks/useDomainError'
import { loadNadbarsUseCase } from '../useCases/loadNadbars'
import { getNadbarCardTitle, getNadbarTypeLabel } from '../utils/nadbarDisplay'

function NadbarEditScreen() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { triggerError } = useDomainError()

  const nadbar = id ? loadNadbarsUseCase().find((item) => item.id === id) : undefined

  useEffect(() => {
    if (!nadbar) {
      triggerError('הנדבר המבוקש לא נמצא')
      navigate('/nadbarim', { replace: true })
    }
  }, [nadbar, navigate, triggerError])

  if (!nadbar) {
    return null
  }

  return (
    <div dir="rtl" className="flex flex-col bg-neutral-50 min-h-full">
      <header className="sticky top-0 z-10 bg-white px-4 py-3 flex items-center border-b border-neutral-200 shrink-0">
        <button
          type="button"
          onClick={() => navigate('/nadbarim')}
          className="text-sm font-semibold text-blue-600 active:opacity-70 touch-manipulation"
        >
          חזור
        </button>
        <span className="flex-1 text-center font-bold text-lg text-neutral-800">עריכת נדבר</span>
        <span className="w-12" />
      </header>

      <div className="flex flex-col gap-3 p-4">
        <div className="bg-white rounded-2xl border border-neutral-200 shadow-sm p-4 flex flex-col gap-2">
          <div className="font-bold text-neutral-800 text-base">{getNadbarCardTitle(nadbar)}</div>
          <div className="text-sm text-neutral-500">{getNadbarTypeLabel(nadbar.type)}</div>
        </div>
        <p className="text-center text-neutral-500 py-4">עריכת נדבר — בקרוב</p>
      </div>
    </div>
  )
}

export default NadbarEditScreen
