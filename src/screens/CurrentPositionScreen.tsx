import PositionForm from '../components/PositionForm'
import { saveCurrentPositionUseCase } from '../useCases/saveCurrentPosition'
import type { PositionInput } from '../domain/position.types'

function CurrentPositionScreen() {
  function handleSave(data: PositionInput) {
    saveCurrentPositionUseCase(data)
  }

  return (
    <div dir="rtl" className="flex flex-col bg-neutral-50">
      <header className="py-4 px-4 text-center font-bold text-lg border-b border-neutral-200 text-neutral-800 bg-white">
        עמדה נוכחית
      </header>

      <div className="p-4">
        <PositionForm onSubmit={handleSave} />
      </div>
    </div>
  )
}

export default CurrentPositionScreen
