import { useParams } from 'react-router-dom'
import NadbarChatView from '../components/NadbarChatView'
import NadbarEditScreenHeader from '../components/NadbarEditScreenHeader'
import { useNadbarEditFlow } from '../hooks/useNadbarEditFlow'

function NadbarEditScreen() {
  const { id } = useParams<{ id: string }>()
  const {
    draftNadbar,
    setUserVar,
    setNotes,
    updateDraftLinks,
    saveNadbar,
    handleBlockFooterAction,
    showGlobalTargetLoad,
    loadedTargetId,
    handleLoadTarget,
    handleClearLoadedTarget,
    handleAddObstacle,
  } = useNadbarEditFlow(id)

  if (!draftNadbar) {
    return null
  }

  return (
    <div dir="rtl" className="flex flex-col bg-neutral-50 min-h-full">
      <NadbarEditScreenHeader
        draftNadbar={draftNadbar}
        onLinksChange={updateDraftLinks}
        onSave={saveNadbar}
        showGlobalTargetLoad={showGlobalTargetLoad}
        loadedTargetId={loadedTargetId}
        onLoadTarget={handleLoadTarget}
        onClearLoadedTarget={handleClearLoadedTarget}
      />

      <div className="flex-1 overflow-y-auto">
        <NadbarChatView
          nadbarType={draftNadbar.type}
          messageBlocks={draftNadbar.messageBlocks}
          links={draftNadbar.links}
          blockMessageVars={draftNadbar.blockMessageVars}
          notes={draftNadbar.notes ?? ''}
          onNotesChange={setNotes}
          onUserVarChange={setUserVar}
          onBlockFooterAction={handleBlockFooterAction}
          onBlockAddObstacle={handleAddObstacle}
        />
      </div>
    </div>
  )
}

export default NadbarEditScreen
