import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import CurrentPositionForm from '../components/CurrentPositionForm'
import { saveCurrentPositionUseCase } from '../useCases/saveCurrentPosition'
import { updatePositionUseCase } from '../useCases/updatePosition'
import { loadCurrentPositionUseCase } from '../useCases/loadCurrentPosition'
import { useNotification } from '../hooks/useNotification'
import type { Position, PositionInput } from '../domain/position.types'

function CurrentPositionScreen() {
  const navigate = useNavigate()
  const { notifySuccess } = useNotification()
  const [existingPosition, setExistingPosition] = useState<Position | null>(null)
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    const position = loadCurrentPositionUseCase()
    setExistingPosition(position)
    setLoaded(true)
  }, [])

  function handleSave(data: PositionInput) {
    if (existingPosition) {
      updatePositionUseCase(existingPosition.id, data)
    } else {
      saveCurrentPositionUseCase(data)
    }
    notifySuccess('העמדה נשמרה בהצלחה')
    navigate('/')
  }

  const title = existingPosition ? 'עריכת עמדה נוכחית' : 'עמדה נוכחית'

  return (
    <div dir="rtl" className="flex flex-col bg-neutral-50">
      <header className="py-4 px-4 text-center font-bold text-lg border-b border-neutral-200 text-neutral-800 bg-white">
        {title}
      </header>

      <div className="p-4">
        {loaded && (
          <CurrentPositionForm onSubmit={handleSave} initialValues={existingPosition ?? undefined} />
        )}
      </div>
    </div>
  )
}

export default CurrentPositionScreen
