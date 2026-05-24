import NadbarNewChatStep from '../components/NadbarNewChatStep'
import EntityLoadLinksStep from '../components/EntityLoadLinksStep'
import { nadbarRequiresEntityLinks } from '../domain/nadbar'
import { useNadbarNewFlow } from '../hooks/useNadbarNewFlow'
import { getNadbarTypeLabel } from '../utils/nadbarDisplay'

function NadbarNewScreen() {
  const {
    nadbarType,
    step,
    pointerId,
    targetId,
    positionId,
    draftNadbar,
    setUserVar,
    updateLinkIds,
    advanceFromLinksStep,
    saveDraftLinks,
    saveNadbar,
  } = useNadbarNewFlow()

  if (!nadbarType) {
    return null
  }

  if (step === 'links' && nadbarRequiresEntityLinks(nadbarType)) {
    return (
      <div className="h-full min-h-0">
        <EntityLoadLinksStep
          sections={['indicator', 'target', 'position']}
          header={{
            stepLabel: 'שלב 1 מתוך 2',
            title: 'קישור מציין, מטרה ועמדה',
            subtitle: `בחר את כל הישויות · ${getNadbarTypeLabel(nadbarType)}`,
          }}
          pointerId={pointerId}
          targetId={targetId}
          positionId={positionId}
          onLinksChange={updateLinkIds}
          onNext={advanceFromLinksStep}
        />
      </div>
    )
  }

  if (!draftNadbar) {
    return null
  }

  return (
    <NadbarNewChatStep
      nadbarType={nadbarType}
      draftNadbar={draftNadbar}
      onUserVarChange={setUserVar}
      onLinksChange={saveDraftLinks}
      onSave={saveNadbar}
    />
  )
}

export default NadbarNewScreen
