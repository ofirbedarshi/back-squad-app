import { useNavigate, useParams } from 'react-router-dom'
import NadbarChatView from '../components/NadbarChatView'
import NadbarEditScreenHeader from '../components/NadbarEditScreenHeader'
import { useNadbarEditFlow } from '../hooks/useNadbarEditFlow'
import { getNadbarTypeLabel } from '../utils/nadbarDisplay'

function NadbarEditScreen() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const { draftNadbar, setUserVar, updateDraftLinks, saveNadbar } = useNadbarEditFlow(id)

  if (!draftNadbar) {
    return null
  }

  return (
    <div dir="rtl" className="flex flex-col bg-neutral-50 min-h-full">
      <NadbarEditScreenHeader
        draftNadbar={draftNadbar}
        onBack={() => navigate('/nadbarim')}
        onLinksChange={updateDraftLinks}
        onSave={saveNadbar}
      />

      <p className="text-center text-xs text-neutral-500 py-2 bg-white border-b border-neutral-100">
        {getNadbarTypeLabel(draftNadbar.type)}
      </p>

      <div className="flex-1 overflow-y-auto">
        <NadbarChatView
          messages={draftNadbar.messages}
          links={draftNadbar.links}
          messageVars={draftNadbar.messageVars}
          onUserVarChange={setUserVar}
        />
      </div>
    </div>
  )
}

export default NadbarEditScreen
