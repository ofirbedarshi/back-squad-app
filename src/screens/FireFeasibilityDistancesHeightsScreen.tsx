import { useEffect } from 'react'
import EntityLoadLinksStep from '../components/EntityLoadLinksStep'
import FireFeasibilityDistancesHeightsForm from '../components/FireFeasibilityDistancesHeightsForm'
import { useEntityLinkResources } from '../hooks/useEntityLinkResources'
import { useFireFeasibilitySubFlow } from '../hooks/useFireFeasibilitySubFlow'
import { useUIError } from '../hooks/useUIError'

function FireFeasibilityDistancesHeightsScreen() {
  const { step, targetId, positionId, updateLinks, advanceFromLinksStep } = useFireFeasibilitySubFlow()
  const { position, target } = useEntityLinkResources({ targetId, positionId })
  const { reportUIError } = useUIError()

  useEffect(() => {
    if (step !== 'content') return
    if (!positionId || !position) {
      reportUIError('לא נמצאה עמדה — חזור לשלב הבחירה')
    }
    if (!targetId || !target) {
      reportUIError('לא נמצאה מטרה — חזור לשלב הבחירה')
    }
  }, [step, positionId, position, targetId, target, reportUIError])

  if (step === 'links') {
    return (
      <div className="h-full min-h-0">
        <EntityLoadLinksStep
          sections={['target', 'position']}
          header={{
            stepLabel: 'שלב 1 מתוך 2',
            title: 'מרחקים וגבהים',
            subtitle: 'בחר מטרה ועמדה',
          }}
          targetId={targetId}
          positionId={positionId}
          onLinksChange={updateLinks}
          onNext={advanceFromLinksStep}
        />
      </div>
    )
  }

  if (!position || !target) {
    return null
  }

  return (
    <div dir="rtl" className="flex h-full min-h-0 flex-col bg-neutral-50">
      <header className="shrink-0 border-b border-neutral-200 bg-white px-4 py-4 text-center text-lg font-bold text-neutral-800">
        היתכנות לירי - טווח גובה
      </header>

      <div className="min-h-0 flex-1 overflow-y-auto p-4">
        <FireFeasibilityDistancesHeightsForm position={position} target={target} />
      </div>
    </div>
  )
}

export default FireFeasibilityDistancesHeightsScreen
