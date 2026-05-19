import { useEffect, useRef, useState } from 'react'
import { loadVoiceBlobUseCase } from '../useCases/loadVoiceBlob'

interface NoteVoicePlaybackProps {
  noteId: string
  onError: (message: string) => void
  /** When true, taps on the play button do not bubble to a parent ListCard press handler. */
  stopCardPress?: boolean
}

function NoteVoicePlayback({ noteId, onError, stopCardPress = false }: NoteVoicePlaybackProps) {
  const [blobUrl, setBlobUrl] = useState<string | null>(null)
  const [playState, setPlayState] = useState<'idle' | 'playing' | 'loading'>('idle')
  const audioRef = useRef<HTMLAudioElement>(null)
  const blobUrlRef = useRef<string | null>(null)

  useEffect(() => {
    blobUrlRef.current = blobUrl
  }, [blobUrl])

  useEffect(() => {
    setBlobUrl((prev) => {
      if (prev) URL.revokeObjectURL(prev)
      return null
    })
    setPlayState('idle')
  }, [noteId])

  useEffect(() => {
    return () => {
      if (blobUrlRef.current) {
        URL.revokeObjectURL(blobUrlRef.current)
      }
    }
  }, [])

  useEffect(() => {
    if (playState !== 'loading' || !blobUrl) return
    const el = audioRef.current
    if (!el) return
    void el
      .play()
      .then(() => setPlayState('playing'))
      .catch(() => {
        setPlayState('idle')
        onError('לא ניתן להפעיל את ההקלטה')
      })
  }, [playState, blobUrl, onError])

  useEffect(() => {
    const el = audioRef.current
    if (!el) return
    function onEnded() {
      setPlayState('idle')
    }
    el.addEventListener('ended', onEnded)
    return () => el.removeEventListener('ended', onEnded)
  }, [blobUrl])

  async function handleToggle() {
    if (playState === 'playing') {
      audioRef.current?.pause()
      setPlayState('idle')
      return
    }

    try {
      if (!blobUrl) {
        setPlayState('loading')
        const blob = await loadVoiceBlobUseCase(noteId)
        setBlobUrl((prev) => {
          if (prev) URL.revokeObjectURL(prev)
          return URL.createObjectURL(blob)
        })
        return
      }

      const el = audioRef.current
      if (el) {
        el.currentTime = 0
      }
      await el?.play()
      setPlayState('playing')
    } catch {
      setPlayState('idle')
      onError('לא ניתן לטעון את ההקלטה')
    }
  }

  const label = playState === 'playing' ? 'השהה' : playState === 'loading' ? 'טוען…' : 'נגן'

  function stopPressPropagation(e: React.SyntheticEvent) {
    if (stopCardPress) {
      e.stopPropagation()
    }
  }

  return (
    <>
      <button
        type="button"
        onClick={(e) => {
          stopPressPropagation(e)
          void handleToggle()
        }}
        onMouseDown={stopPressPropagation}
        onTouchStart={stopPressPropagation}
        disabled={playState === 'loading'}
        className="shrink-0 rounded-full border border-neutral-200 bg-white px-4 py-2 text-sm font-medium text-neutral-800 shadow-sm active:bg-neutral-50 touch-manipulation select-none disabled:opacity-50 transition"
      >
        {label}
      </button>
      <audio ref={audioRef} src={blobUrl ?? undefined} className="hidden" preload="auto" />
    </>
  )
}

export default NoteVoicePlayback
