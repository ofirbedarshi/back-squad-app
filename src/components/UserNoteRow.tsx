import ListCard from './base/ListCard'
import type { OptionsMenuItem } from './base/OptionsMenu'
import { getNoteCardTitleText } from '../domain/notes'
import type { UserNote } from '../domain/notes.types'
import { formatVoiceDurationSec } from '../domain/voiceNote'
import NoteVoicePlayback from './NoteVoicePlayback'

interface UserNoteRowProps {
  note: UserNote
  lastUpdatedAt: string
  onClick: () => void
  menuItems: OptionsMenuItem[]
  onPlaybackError: (message: string) => void
}

function UserNoteRow({ note, lastUpdatedAt, onClick, menuItems, onPlaybackError }: UserNoteRowProps) {
  const textDisplay = getNoteCardTitleText(note)
  const menuTitle = note.text.trim() || 'הערה ללא טקסט'

  return (
    <ListCard
      title={
        <span
          className={`font-normal whitespace-pre-wrap break-words ${
            note.text.trim() ? 'text-neutral-800' : 'text-neutral-400 italic'
          }`}
        >
          {textDisplay}
        </span>
      }
      menuTitle={menuTitle}
      menuItems={menuItems}
      subheader={
        note.hasVoice ? (
          <div className="flex flex-wrap items-center gap-2">
            {typeof note.durationSec === 'number' ? (
              <span>הקלטה · {formatVoiceDurationSec(note.durationSec)}</span>
            ) : (
              <span>הקלטה קולית</span>
            )}
            <NoteVoicePlayback noteId={note.id} onError={onPlaybackError} stopCardPress />
          </div>
        ) : null
      }
      lastUpdatedAt={lastUpdatedAt}
      onClick={onClick}
    />
  )
}

export default UserNoteRow
