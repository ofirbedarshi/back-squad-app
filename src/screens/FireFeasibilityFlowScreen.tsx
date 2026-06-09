import FireFeasibilityCalculateFooter from '../components/FireFeasibilityCalculateFooter'
import FireFeasibilityForm from '../components/FireFeasibilityForm'
import FireFeasibilityResultsStep from '../components/FireFeasibilityResultsStep'
import { FIRE_FEASIBILITY_FLOW_TITLE } from '../domain/fireFeasibilityModeConfig'
import { useFireFeasibilityFlow } from '../hooks/useFireFeasibilityFlow'

function FireFeasibilityFlowScreen() {
  const {
    mode,
    setMode,
    step,
    targetId,
    positionId,
    results,
    setPositionId,
    setTargetId,
    position,
    target,
    formData,
    handleCalculate,
    handleUpdateData,
    handleSaveResults,
  } = useFireFeasibilityFlow()

  const calculateDisabled =
    !position ||
    formData.positionToTargetRange === null ||
    formData.positionToTargetHeightDifference === null

  if (step === 'results' && results) {
    return <FireFeasibilityResultsStep results={results} onSave={handleSaveResults} />
  }

  return (
    <div dir="rtl" className="flex h-full min-h-0 flex-col bg-neutral-50">
      <header className="shrink-0 border-b border-neutral-200 bg-white px-4 py-4">
        <h1 className="text-center text-lg font-bold text-neutral-800">{FIRE_FEASIBILITY_FLOW_TITLE}</h1>
      </header>

      <div className="min-h-0 flex-1 overflow-y-auto p-4">
        <FireFeasibilityForm
          mode={mode}
          onModeChange={setMode}
          positionId={positionId}
          targetId={targetId}
          position={position}
          target={target}
          onPositionChange={(id) => setPositionId(id ?? undefined)}
          onTargetChange={(id) => setTargetId(id ?? undefined)}
          onUpdateData={handleUpdateData}
        />
      </div>

      <FireFeasibilityCalculateFooter
        onCalculate={handleCalculate}
        disabled={calculateDisabled}
      />
    </div>
  )
}

export default FireFeasibilityFlowScreen
