import EntityLoadLinksStep from '../components/EntityLoadLinksStep'
import FireFeasibilityCoordsForm from '../components/FireFeasibilityCoordsForm'
import { useFireFeasibilitySubFlow } from '../hooks/useFireFeasibilitySubFlow'

function FireFeasibilityCoordsScreen() {
  const { step, targetId, positionId, updateLinks, advanceFromLinksStep } = useFireFeasibilitySubFlow()

  if (step === 'links') {
    return (
      <div className="h-full min-h-0">
        <EntityLoadLinksStep
          sections={['target', 'position']}
          header={{
            stepLabel: 'שלב 1 מתוך 2',
            title: 'נצ',
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

  return (
    <div dir="rtl" className="flex h-full min-h-0 flex-col bg-neutral-50">
      <header className="shrink-0 border-b border-neutral-200 bg-white px-4 py-4 text-center text-lg font-bold text-neutral-800">
        היתכנות לירי - נ.צ
      </header>

      <div className="min-h-0 flex-1 overflow-y-auto p-4">
        <FireFeasibilityCoordsForm />
      </div>
    </div>
  )
}

export default FireFeasibilityCoordsScreen
