import NadbarNewChatStep from '../components/NadbarNewChatStep'
import NadbarNewLinksStep from '../components/NadbarNewLinksStep'
import { useNadbarNewFlow } from '../hooks/useNadbarNewFlow'

function NadbarNewScreen() {
  const {
    nadbarType,
    step,
    pointerId,
    targetId,
    draftNadbar,
    updateLinkIds,
    advanceFromLinksStep,
    saveDraftLinks,
    saveNadbar,
  } = useNadbarNewFlow()

  if (!nadbarType) {
    return null
  }

  if (step === 'links') {
    return (
      <NadbarNewLinksStep
        nadbarType={nadbarType}
        pointerId={pointerId}
        targetId={targetId}
        onLinksChange={updateLinkIds}
        onNext={advanceFromLinksStep}
      />
    )
  }

  if (!draftNadbar) {
    return null
  }

  return (
    <NadbarNewChatStep
      nadbarType={nadbarType}
      draftNadbar={draftNadbar}
      onLinksChange={saveDraftLinks}
      onSave={saveNadbar}
    />
  )
}

export default NadbarNewScreen
