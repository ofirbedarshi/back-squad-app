import EntityLoadLinksStep from '../components/EntityLoadLinksStep'
import FireFeasibilityCalculateFooter from '../components/FireFeasibilityCalculateFooter'
import FireFeasibilityForm from '../components/FireFeasibilityForm'
import FireFeasibilityResultsView from '../components/FireFeasibilityResultsView'
import {
  FIRE_FEASIBILITY_MODE_CONFIG,
  FIRE_FEASIBILITY_RESULTS_TITLE,
} from '../domain/fireFeasibilityModeConfig'
import type { FireFeasibilityMode } from '../domain/fireFeasibility.types'
import { useFireFeasibilityFlow } from '../hooks/useFireFeasibilityFlow'

interface FireFeasibilityFlowScreenProps {
  mode: FireFeasibilityMode
}

function FireFeasibilityFlowScreen({ mode }: FireFeasibilityFlowScreenProps) {
  const config = FIRE_FEASIBILITY_MODE_CONFIG[mode]
  const {
    step,
    targetId,
    positionId,
    results,
    updateLinks,
    position,
    target,
    formData,
    handleAdvanceFromLinks,
    handleCalculate,
    handleUpdateData,
  } = useFireFeasibilityFlow(mode)

  if (step === 'links') {
    return (
      <div className="h-full min-h-0">
        <EntityLoadLinksStep
          sections={['target', 'position']}
          header={{
            stepLabel: 'שלב 1 מתוך 3',
            title: config.linksTitle,
            subtitle: config.linksSubtitle,
          }}
          targetId={targetId}
          positionId={positionId}
          onLinksChange={updateLinks}
          onNext={handleAdvanceFromLinks}
        />
      </div>
    )
  }

  if (step === 'results' && results) {
    return (
      <div dir="rtl" className="flex h-full min-h-0 flex-col bg-neutral-50">
        <header className="shrink-0 border-b border-neutral-200 bg-white px-4 py-4 text-center text-lg font-bold text-neutral-800">
          {FIRE_FEASIBILITY_RESULTS_TITLE}
        </header>

        <div className="min-h-0 flex-1 overflow-y-auto p-4">
          <FireFeasibilityResultsView results={results} formData={formData} />
        </div>
      </div>
    )
  }

  if (!position || !target) {
    return null
  }

  return (
    <div dir="rtl" className="flex h-full min-h-0 flex-col bg-neutral-50">
      <header className="shrink-0 border-b border-neutral-200 bg-white px-4 py-4 text-center text-lg font-bold text-neutral-800">
        {config.formTitle}
      </header>

      <div className="min-h-0 flex-1 overflow-y-auto p-4">
        <FireFeasibilityForm
          mode={mode}
          position={position}
          target={target}
          onUpdateData={handleUpdateData}
        />
      </div>

      <FireFeasibilityCalculateFooter onCalculate={handleCalculate} />
    </div>
  )
}

export default FireFeasibilityFlowScreen
