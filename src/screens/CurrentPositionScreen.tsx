import { useNavigate } from 'react-router-dom'
import CurrentPositionForm from '../components/CurrentPositionForm'
import DocFeedbackModal from '../components/base/DocFeedbackModal'
import { saveCurrentPositionUseCase } from '../useCases/saveCurrentPosition'
import { useNotification } from '../hooks/useNotification'
import type { PositionInput } from '../domain/position.types'
import currentPositionDocMarkdown from '../../docs/מסך-עמדה-נוכחית.md?raw'

function CurrentPositionScreen() {
  const navigate = useNavigate()
  const { notifySuccess } = useNotification()

  function handleSave(data: PositionInput) {
    saveCurrentPositionUseCase(data)
    notifySuccess('העמדה נשמרה בהצלחה')
    navigate('/')
  }

  return (
    <div dir="rtl" className="relative flex flex-col bg-neutral-50">
      <header className="py-4 px-4 text-center font-bold text-lg border-b border-neutral-200 text-neutral-800 bg-white">
        עמדה נוכחית
      </header>

      <div className="p-4">
        <CurrentPositionForm onSubmit={handleSave} />
      </div>
      <DocFeedbackModal
        markdown={currentPositionDocMarkdown}
        modalTitle="מידע על מסך עמדה נוכחית"
        shareTitle="מסך עמדה נוכחית"
        openButtonAriaLabel="פתח מידע על המסך"
      />
    </div>
  )
}

export default CurrentPositionScreen
