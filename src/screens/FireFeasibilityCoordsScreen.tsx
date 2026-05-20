import EntityLoadLinksStep from '../components/EntityLoadLinksStep'
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
    <div dir="rtl" className="flex flex-col items-center justify-center h-full gap-3 text-neutral-700">
      <h2 className="text-2xl font-semibold tracking-tight text-center px-4">נצ</h2>
      <p className="text-sm text-neutral-400">בקרוב</p>
    </div>
  )
}

export default FireFeasibilityCoordsScreen
