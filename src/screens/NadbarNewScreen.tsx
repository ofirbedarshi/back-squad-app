import { useMemo } from 'react'
import { useNavigate } from 'react-router-dom'
import NadbarChatView from '../components/NadbarChatView'
import { useNadbarTypeRouteParam } from '../hooks/useNadbarTypeRouteParam'
import { useNotification } from '../hooks/useNotification'
import { addNadbarUseCase } from '../useCases/addNadbar'
import { createNadbarFromTypeUseCase } from '../useCases/createNadbarFromType'
import { getNadbarTypeLabel } from '../utils/nadbarDisplay'

function NadbarNewScreen() {
  const navigate = useNavigate()
  const nadbarType = useNadbarTypeRouteParam()
  const { notifySuccess } = useNotification()

  const previewNadbar = useMemo(
    () => (nadbarType ? createNadbarFromTypeUseCase(nadbarType) : null),
    [nadbarType],
  )

  if (!nadbarType || !previewNadbar) {
    return null
  }

  const nadbarToSave = previewNadbar

  function handleSave() {
    addNadbarUseCase(nadbarToSave)
    notifySuccess('הנדבר נשמר')
    navigate('/nadbarim')
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
        <span className="flex-1 text-center font-bold text-lg text-neutral-800">
          הוסף · {getNadbarTypeLabel(nadbarType)}
        </span>
        <button
          type="button"
          onClick={handleSave}
          className="text-sm font-bold text-white bg-blue-600 rounded-xl px-4 py-2 active:bg-blue-700 touch-manipulation"
        >
          שמור
        </button>
      </header>

      <div className="flex-1 overflow-y-auto">
        <NadbarChatView messages={previewNadbar.messages} />
      </div>
    </div>
  )
}

export default NadbarNewScreen
