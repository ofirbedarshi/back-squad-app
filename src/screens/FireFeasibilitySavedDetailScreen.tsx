import { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import FireFeasibilityResultsView from '../components/FireFeasibilityResultsView'
import type { FireFeasibilityRecord } from '../domain/fireFeasibility.types'
import { useUIError } from '../hooks/useUIError'
import { getFireFeasibilityRecordByIdUseCase } from '../useCases/getFireFeasibilityRecordById'
import { getFireFeasibilityCardTitle } from '../utils/fireFeasibilityDisplay'

function FireFeasibilitySavedDetailScreen() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { reportUIError } = useUIError()
  const [record, setRecord] = useState<FireFeasibilityRecord | null>(null)

  useEffect(() => {
    if (!id) {
      reportUIError('מזהה רשומה חסר')
      navigate('/fire-feasibility/saved')
      return
    }

    const loaded = getFireFeasibilityRecordByIdUseCase(id)
    if (!loaded) {
      reportUIError('הרשומה לא נמצאה')
      navigate('/fire-feasibility/saved')
      return
    }

    setRecord(loaded)
  }, [id, navigate, reportUIError])

  if (!record) {
    return null
  }

  return (
    <div dir="rtl" className="flex h-full min-h-0 flex-col bg-neutral-50">
      <header className="shrink-0 border-b border-neutral-200 bg-white px-4 py-4 text-center text-lg font-bold text-neutral-800">
        {getFireFeasibilityCardTitle(record)}
      </header>

      <div className="min-h-0 flex-1 overflow-y-auto p-4">
        <FireFeasibilityResultsView results={record.results} />
      </div>
    </div>
  )
}

export default FireFeasibilitySavedDetailScreen
