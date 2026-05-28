import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import FireFeasibilityCloudsMockModal from '../components/FireFeasibilityCloudsMockModal'
import FireFeasibilityObstaclesMockModal from '../components/FireFeasibilityObstaclesMockModal'
import FireFeasibilityRangeHeightTargetMockModal from '../components/FireFeasibilityRangeHeightTargetMockModal'
import HeaderOptionsMenu from '../components/base/HeaderOptionsMenu'
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
import { createObstaclesFeasibilityMockUseCase } from '../useCases/createObstaclesFeasibilityMock'
import { createRangeHeightTargetMockUseCase } from '../useCases/createRangeHeightTargetMock'
import { loadFireFeasibilityRecordsUseCase } from '../useCases/loadFireFeasibilityRecords'
import { loadPositionsUseCase } from '../useCases/loadPositions'
import { loadTargetsUseCase } from '../useCases/loadTargets'
import { removeAllFireFeasibilityRecordsUseCase } from '../useCases/removeAllFireFeasibilityRecords'
import { removeFireFeasibilityRecordUseCase } from '../useCases/removeFireFeasibilityRecord'
import { getFireFeasibilityCardDetails, getFireFeasibilityCardTitle } from '../utils/fireFeasibilityDisplay'

function FireFeasibilityListScreen() {
  const [records, setRecords] = useState<FireFeasibilityRecord[]>([])
  const [targets, setTargets] = useState<Target[]>([])
  const [positions, setPositions] = useState<Position[]>([])
  const [showCloudsMockModal, setShowCloudsMockModal] = useState(false)
  const [showObstaclesMockModal, setShowObstaclesMockModal] = useState(false)
  const [showRangeHeightTargetMockModal, setShowRangeHeightTargetMockModal] = useState(false)
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

  async function handleCreateObstaclesMock(input: {
    desiredGenAEnabled: boolean
    flightPath: FireFeasibilityFlightPath
  }) {
    try {
      createObstaclesFeasibilityMockUseCase(input)
      resetResources()
      notifySuccess('מטרת הבדיקה והתוצאות נשמרו')
    } catch (error) {
      triggerError(error instanceof Error ? error.message : 'יצירת מטרת בדיקה נכשלה')
      throw error
    }
  }

  async function handleCreateRangeHeightTargetMock(input: {
    rangeMeters: number
    heightDifferenceMeters: number
  }) {
    try {
      createRangeHeightTargetMockUseCase(input)
      resetResources()
      notifySuccess('מטרת הבדיקה נשמרה')
    } catch (error) {
      triggerError(error instanceof Error ? error.message : 'יצירת מטרת בדיקה נכשלה')
      throw error
    }
  }

  async function handleRemoveAll() {
    const confirmed = await confirm({
      title: 'מחיקת כל התוצאות',
      message: 'פעולה זו תמחק את כל התוצאות השמורות ללא אפשרות שחזור.',
      confirmLabel: 'מחק הכל',
      cancelLabel: 'ביטול',
      variant: 'danger',
    })
    if (!confirmed) return
    try {
      removeAllFireFeasibilityRecordsUseCase()
      resetResources()
      notifySuccess('כל התוצאות נמחקו')
    } catch {
      triggerError('מחיקת כל התוצאות נכשלה')
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
      <header className="relative border-b border-neutral-200 bg-white px-4 py-4 text-center text-lg font-bold text-neutral-800">
        היתכנות לירי
        <HeaderOptionsMenu
          items={[
            {
              label: 'מחק את כל התוצאות',
              variant: 'danger',
              onSelect: handleRemoveAll,
            },
          ]}
        />
      </header>

      <div className="flex flex-col gap-3 p-4">
        <button
          type="button"
          onClick={() => setShowCloudsMockModal(true)}
          className="w-full rounded-xl border border-blue-200 bg-blue-50 px-4 py-3 text-sm font-bold text-blue-700 active:bg-blue-100 touch-manipulation"
        >
          צור מטרת בדיקה לעננים
        </button>
        <button
          type="button"
          onClick={() => setShowObstaclesMockModal(true)}
          className="w-full rounded-xl border border-violet-200 bg-violet-50 px-4 py-3 text-sm font-bold text-violet-700 active:bg-violet-100 touch-manipulation"
        >
          צור מטרת בדיקה למכשולים
        </button>
        <button
          type="button"
          onClick={() => setShowRangeHeightTargetMockModal(true)}
          className="w-full rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-bold text-emerald-700 active:bg-emerald-100 touch-manipulation"
        >
          צור מטרה מטווח והפרש גובה
        </button>

        {records.length === 0 && (
          <p className="py-8 text-center text-neutral-400">אין היתכנויות לירי שמורות</p>
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

        <button
          type="button"
          onClick={() => navigate('/fire-feasibility/new')}
          className="w-full py-4 rounded-2xl border-2 border-dashed border-neutral-300 text-neutral-500 font-semibold text-base active:bg-neutral-100 transition-colors touch-manipulation select-none"
        >
          + הוסף היתכנות לירי
        </button>
      </div>

      {showCloudsMockModal && (
        <FireFeasibilityCloudsMockModal
          onClose={() => setShowCloudsMockModal(false)}
          onSubmit={handleCreateCloudsMock}
        />
      )}
      {showObstaclesMockModal && (
        <FireFeasibilityObstaclesMockModal
          onClose={() => setShowObstaclesMockModal(false)}
          onSubmit={handleCreateObstaclesMock}
        />
      )}
      {showRangeHeightTargetMockModal && (
        <FireFeasibilityRangeHeightTargetMockModal
          onClose={() => setShowRangeHeightTargetMockModal(false)}
          onSubmit={handleCreateRangeHeightTargetMock}
        />
      )}
    </div>
  )
}

export default FireFeasibilityListScreen
