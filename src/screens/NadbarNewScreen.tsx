import { useNavigate } from 'react-router-dom'
import { useNadbarTypeRouteParam } from '../hooks/useNadbarTypeRouteParam'
import { getNadbarTypeLabel } from '../utils/nadbarDisplay'

function NadbarNewScreen() {
  const navigate = useNavigate()
  const nadbarType = useNadbarTypeRouteParam()

  if (!nadbarType) {
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
        <span className="flex-1 text-center font-bold text-lg text-neutral-800">
          הוסף · {getNadbarTypeLabel(nadbarType)}
        </span>
        <span className="w-12" />
      </header>

      <div className="flex flex-col items-center justify-center flex-1 gap-3 p-4 text-neutral-500">
        <p className="text-base text-center">יצירת נדבר — בקרוב</p>
      </div>
    </div>
  )
}

export default NadbarNewScreen
