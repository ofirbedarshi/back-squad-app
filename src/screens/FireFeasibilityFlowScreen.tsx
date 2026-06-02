import EntityLoadLinksStep from '../components/EntityLoadLinksStep'
import FireFeasibilityCalculateFooter from '../components/FireFeasibilityCalculateFooter'
import FireFeasibilityForm from '../components/FireFeasibilityForm'
import FireFeasibilityFormModeToggle from '../components/FireFeasibilityFormModeToggle'
import FireFeasibilityResultsStep from '../components/FireFeasibilityResultsStep'
import {
  FIRE_FEASIBILITY_FLOW_TITLE,
  FIRE_FEASIBILITY_LINKS_SUBTITLE,
} from '../domain/fireFeasibilityModeConfig'
import { useFireFeasibilityFlow } from '../hooks/useFireFeasibilityFlow'

function FireFeasibilityFlowScreen() {
  const {
    mode,
    setMode,
    step,
    targetId,
    positionId,
    results,
    updateLinks,
    position,
    target,
    handleAdvanceFromLinks,
    handleCalculate,
    handleUpdateData,
    handleSaveResults,
  } = useFireFeasibilityFlow()

  if (step === 'results' && results) {
    return <FireFeasibilityResultsStep results={results} onSave={handleSaveResults} />
  }

  if (step === 'form' && position && target) {
    return (
      <div dir="rtl" className="flex h-full min-h-0 flex-col bg-neutral-50">
        <header className="shrink-0 border-b border-neutral-200 bg-white px-4 py-4">
          <h1 className="text-center text-lg font-bold text-neutral-800">{FIRE_FEASIBILITY_FLOW_TITLE}</h1>
          <div className="mt-3">
            <FireFeasibilityFormModeToggle mode={mode} onModeChange={setMode} />
          </div>
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

  return (
    <div className="h-full min-h-0">
      <EntityLoadLinksStep
        sections={['target', 'position']}
        header={{
          stepLabel: 'שלב 1 מתוך 3',
          title: FIRE_FEASIBILITY_FLOW_TITLE,
          subtitle: FIRE_FEASIBILITY_LINKS_SUBTITLE,
        }}
        targetId={targetId}
        positionId={positionId}
        onLinksChange={updateLinks}
        onNext={handleAdvanceFromLinks}
      />
    </div>
  )
}

export default FireFeasibilityFlowScreen
