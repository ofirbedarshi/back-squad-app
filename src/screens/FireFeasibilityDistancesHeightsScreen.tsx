import { useCallback, useEffect } from 'react'
import DocFeedbackModal from '../components/base/DocFeedbackModal'
import EntityLoadLinksStep from '../components/EntityLoadLinksStep'
import fireFeasibilityDocMarkdown from '../../docs/היתכנות-לירי.md?raw'
import FireFeasibilityCalculateFooter from '../components/FireFeasibilityCalculateFooter'
import FireFeasibilityDistancesHeightsForm from '../components/FireFeasibilityDistancesHeightsForm'
import FireFeasibilityResultsView from '../components/FireFeasibilityResultsView'
import { useCloudHeight } from '../hooks/useCloudHeight'
import { useEntityLinkResources } from '../hooks/useEntityLinkResources'
import { useFireFeasibilityFlow } from '../hooks/useFireFeasibilityFlow'
import { useUIError } from '../hooks/useUIError'

function FireFeasibilityDistancesHeightsScreen() {
  const flow = useFireFeasibilityFlow('distances-heights')
  const { position, target } = useEntityLinkResources({
    targetId: flow.targetId,
    positionId: flow.positionId,
  })
  const { reportUIError } = useUIError()
  const { inputValue: cloudHeightValue, viewUnit, setViewUnit } = useCloudHeight()

  useEffect(() => {
    if (flow.step !== 'form') return
    if (!flow.positionId || !position) {
      reportUIError('לא נמצאה עמדה — חזור לשלב הבחירה')
    }
    if (!flow.targetId || !target) {
      reportUIError('לא נמצאה מטרה — חזור לשלב הבחירה')
    }
  }, [flow.step, flow.positionId, position, flow.targetId, target, reportUIError])

  const handleAdvanceFromLinks = useCallback(() => {
    if (!position || !target) return
    flow.advanceFromLinks(position.stationName, target.targetName)
  }, [position, target, flow])

  const handleCalculate = useCallback(() => {
    if (!position || !target) return
    flow.calculate({
      cloudHeightDisplay: cloudHeightValue,
      cloudHeightUnit: viewUnit,
    })
  }, [position, target, flow, cloudHeightValue, viewUnit])

  if (flow.step === 'links') {
    return (
      <div className="h-full min-h-0">
        <EntityLoadLinksStep
          sections={['target', 'position']}
          header={{
            stepLabel: 'שלב 1 מתוך 3',
            title: 'מרחקים וגבהים',
            subtitle: 'בחר מטרה ועמדה',
          }}
          targetId={flow.targetId}
          positionId={flow.positionId}
          onLinksChange={flow.updateLinks}
          onNext={handleAdvanceFromLinks}
        />
      </div>
    )
  }

  if (flow.step === 'results' && flow.results) {
    return (
      <div dir="rtl" className="relative flex h-full min-h-0 flex-col bg-neutral-50">
        <header className="shrink-0 border-b border-neutral-200 bg-white px-4 py-4 text-center text-lg font-bold text-neutral-800">
          היתכנות לירי — תוצאות
        </header>

        <div className="min-h-0 flex-1 overflow-y-auto p-4">
          <FireFeasibilityResultsView
            positionName={flow.positionName}
            targetName={flow.targetName}
            results={flow.results}
          />
        </div>

        <DocFeedbackModal
          markdown={fireFeasibilityDocMarkdown}
          modalTitle="מידע על היתכנות לירי"
          shareTitle="היתכנות לירי"
          openButtonAriaLabel="פתח מידע על היתכנות לירי"
        />
      </div>
    )
  }

  if (!position || !target) {
    return null
  }

  return (
    <div dir="rtl" className="relative flex h-full min-h-0 flex-col bg-neutral-50">
      <header className="shrink-0 border-b border-neutral-200 bg-white px-4 py-4 text-center text-lg font-bold text-neutral-800">
        היתכנות לירי - טווח גובה
      </header>

      <div className="min-h-0 flex-1 overflow-y-auto p-4">
        <FireFeasibilityDistancesHeightsForm
          position={position}
          target={target}
          formState={flow.distancesHeightsFormState}
          cloudHeightValue={cloudHeightValue}
          cloudHeightViewUnit={viewUnit}
          onCloudHeightViewUnitChange={setViewUnit}
          onObstacleHeightChange={flow.setObstacleHeight}
          onPositionObstacleRangeChange={flow.setPositionObstacleRange}
          onHide1DistanceChange={flow.setHide1Distance}
          onHide1HeightDiffChange={flow.setHide1HeightDiff}
          onHide2DistanceChange={flow.setHide2Distance}
          onHide2HeightDiffChange={flow.setHide2HeightDiff}
          onFlightPathChange={flow.setFlightPath}
        />
      </div>

      <FireFeasibilityCalculateFooter onCalculate={handleCalculate} />

      <DocFeedbackModal
        markdown={fireFeasibilityDocMarkdown}
        modalTitle="מידע על היתכנות לירי"
        shareTitle="היתכנות לירי"
        openButtonAriaLabel="פתח מידע על היתכנות לירי"
      />
    </div>
  )
}

export default FireFeasibilityDistancesHeightsScreen
