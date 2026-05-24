import { useParams } from 'react-router-dom'
import NadbarChatView from '../components/NadbarChatView'
import NadbarEditScreenHeader from '../components/NadbarEditScreenHeader'
import { useNadbarEditFlow } from '../hooks/useNadbarEditFlow'

function NadbarEditScreen() {
  const { id } = useParams<{ id: string }>()
  const { draftNadbar, setUserVar, updateDraftLinks, saveNadbar } = useNadbarEditFlow(id)

  if (!draftNadbar) {
    return null
  }

  return (
    <div dir="rtl" className="flex flex-col bg-neutral-50 min-h-full">
      <NadbarEditScreenHeader
        draftNadbar={draftNadbar}
        onLinksChange={updateDraftLinks}
        onSave={saveNadbar}
      />

      <div className="flex-1 overflow-y-auto">
        <NadbarChatView
          messageBlocks={draftNadbar.messageBlocks}
          links={draftNadbar.links}
          messageVars={draftNadbar.messageVars}
          onUserVarChange={setUserVar}
        />
      </div>
    </div>
  )
}

export default NadbarEditScreen
