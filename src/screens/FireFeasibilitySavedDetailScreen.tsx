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
    setRecord(null)

    if (!id) {
      reportUIError('מזהה רשומה חסר')
      navigate('/fire-feasibility')
      return
    }

    const loaded = getFireFeasibilityRecordByIdUseCase(id)
    if (!loaded) {
      reportUIError('הרשומה לא נמצאה')
      navigate('/fire-feasibility')
      return
    }

    setRecord(loaded)
  }, [id, navigate, reportUIError])

  if (!record) {
    return (
      <div dir="rtl" className="flex min-h-full flex-col items-center justify-center bg-neutral-50 px-4">
        <p className="text-sm font-medium text-neutral-500">טוען תוצאות…</p>
      </div>
    )
  }

  return (
    <div dir="rtl" className="flex min-h-full flex-col bg-neutral-50">
      <header className="sticky top-0 z-10 shrink-0 border-b border-neutral-200 bg-white px-4 py-3">
        <div className="flex items-center gap-2">
          <span className="min-w-0 flex-1 truncate px-1 text-center text-lg font-bold text-neutral-800">
            {getFireFeasibilityCardTitle(record)}
          </span>
          <button
            type="button"
            onClick={() => navigate(`/fire-feasibility/saved/${record.id}/edit`)}
            className="shrink-0 touch-manipulation rounded-xl border border-neutral-300 bg-white px-3 py-1.5 text-sm font-bold text-neutral-700 active:bg-neutral-100"
          >
            ערוך
          </button>
        </div>
      </header>

      <div className="p-4">
        <FireFeasibilityResultsView results={record.results} />
      </div>
    </div>
  )
}

export default FireFeasibilitySavedDetailScreen
