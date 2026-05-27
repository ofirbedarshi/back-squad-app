import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import FireFeasibilityCloudsMockModal from '../components/FireFeasibilityCloudsMockModal'
import ListCard from '../components/base/ListCard'
import type {
  FireFeasibilityFlightPath,
  FireFeasibilityRecord,
} from '../domain/fireFeasibility.types'
import type { Position } from '../domain/position.types'
import type { Target } from '../domain/target.types'
import { useConfirm } from '../hooks/useConfirm'
import { useDomainError } from '../hooks/useDomainError'
import { useNotification } from '../hooks/useNotification'
import { createCloudsFeasibilityMockUseCase } from '../useCases/createCloudsFeasibilityMock'
import { loadFireFeasibilityRecordsUseCase } from '../useCases/loadFireFeasibilityRecords'
import { loadPositionsUseCase } from '../useCases/loadPositions'
import { loadTargetsUseCase } from '../useCases/loadTargets'
import { removeFireFeasibilityRecordUseCase } from '../useCases/removeFireFeasibilityRecord'
import { getFireFeasibilityCardDetails, getFireFeasibilityCardTitle } from '../utils/fireFeasibilityDisplay'

function FireFeasibilitySavedListScreen() {
  const [records, setRecords] = useState<FireFeasibilityRecord[]>([])
  const [targets, setTargets] = useState<Target[]>([])
  const [positions, setPositions] = useState<Position[]>([])
  const [showCloudsMockModal, setShowCloudsMockModal] = useState(false)
  const navigate = useNavigate()
  const confirm = useConfirm()
  const { triggerError } = useDomainError()
  const { notifySuccess } = useNotification()

  function resetResources() {
    setRecords(loadFireFeasibilityRecordsUseCase())
    setTargets(loadTargetsUseCase())
    setPositions(loadPositionsUseCase())
  }

  useEffect(() => {
    resetResources()
  }, [])

  async function handleCreateCloudsMock(input: {
    desiredGenAEnabled: boolean
    desiredGenBEnabled: boolean
    flightPath: FireFeasibilityFlightPath
  }) {
    try {
      createCloudsFeasibilityMockUseCase(input)
      resetResources()
      notifySuccess('מטרת הבדיקה והתוצאות נשמרו')
    } catch (error) {
      triggerError(error instanceof Error ? error.message : 'יצירת מטרת בדיקה נכשלה')
      throw error
    }
  }

  async function handleRemove(record: FireFeasibilityRecord) {
    const confirmed = await confirm({
      title: 'מחיקת תוצאות',
      message: `למחוק את "${getFireFeasibilityCardTitle(record)}"?`,
      confirmLabel: 'מחק',
      cancelLabel: 'ביטול',
      variant: 'danger',
    })
    if (!confirmed) return
    try {
      removeFireFeasibilityRecordUseCase(record.id)
      resetResources()
      notifySuccess('התוצאות נמחקו')
    } catch {
      triggerError('מחיקת התוצאות נכשלה')
    }
  }

  return (
    <div dir="rtl" className="flex min-h-full flex-col bg-neutral-50">
      <header className="border-b border-neutral-200 bg-white px-4 py-4 text-center text-lg font-bold text-neutral-800">
        תוצאות שמורות
      </header>

      <div className="flex flex-col gap-3 p-4">
        <button
          type="button"
          onClick={() => setShowCloudsMockModal(true)}
          className="w-full rounded-xl border border-blue-200 bg-blue-50 px-4 py-3 text-sm font-bold text-blue-700 active:bg-blue-100 touch-manipulation"
        >
          צור מטרת בדיקה לעננים
        </button>

        {records.length === 0 && (
          <p className="py-8 text-center text-neutral-400">אין תוצאות שמורות</p>
        )}

        {records.map((record) => {
          const { modeLabel, targetName, positionName, savedAtLabel } = getFireFeasibilityCardDetails(
            record,
            targets,
            positions,
          )

          return (
            <ListCard
              key={record.id}
              title={modeLabel}
              subheader={
                <div className="flex flex-col gap-0.5">
                  <span>מטרה: {targetName}</span>
                  <span>עמדה: {positionName}</span>
                </div>
              }
              lastUpdatedAt={savedAtLabel}
              lastUpdatedLabel="נשמר"
              onClick={() => navigate(`/fire-feasibility/saved/${record.id}`)}
              menuTitle={modeLabel}
              menuItems={[
                {
                  label: 'מחק תוצאות',
                  variant: 'danger',
                  onSelect: () => void handleRemove(record),
                },
              ]}
            />
          )
        })}
      </div>

      {showCloudsMockModal && (
        <FireFeasibilityCloudsMockModal
          onClose={() => setShowCloudsMockModal(false)}
          onSubmit={handleCreateCloudsMock}
        />
      )}
    </div>
  )
}

export default FireFeasibilitySavedListScreen
