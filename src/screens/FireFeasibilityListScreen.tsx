import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import FireFeasibilityRangeHeightTargetMockModal from '../components/FireFeasibilityRangeHeightTargetMockModal'
import ListScreenHeader from '../components/base/ListScreenHeader'
import ListCard from '../components/base/ListCard'
import type {
  FireFeasibilityRecord,
} from '../domain/fireFeasibility.types'
import type { Position } from '../domain/position.types'
import type { Target } from '../domain/target.types'
import { useConfirm } from '../hooks/useConfirm'
import { useDomainError } from '../hooks/useDomainError'
import { useNotification } from '../hooks/useNotification'
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
      <ListScreenHeader
        title="היתכנות לירי"
        addLabel="+ הוסף היתכנות לירי"
        onAdd={() => navigate('/fire-feasibility/new')}
        menuItems={[
          {
            label: 'מחק את כל התוצאות',
            variant: 'danger',
            onSelect: handleRemoveAll,
          },
        ]}
      />

      <div className="flex flex-col gap-3 p-4">
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
