import { useEffect, useRef, useState } from 'react'
import type { NoteVoicePayload } from '../domain/notes.types'
import { formatVoiceDurationSec } from '../domain/voiceNote'

interface VoiceRecorderPanelProps {
  onChange: (draft: NoteVoicePayload | null) => void
  onMicError?: (message: string) => void
}

function pickRecorderMime(): string | undefined {
  const candidates = ['audio/webm;codecs=opus', 'audio/webm', 'audio/mp4']
  for (const m of candidates) {
    if (typeof MediaRecorder !== 'undefined' && MediaRecorder.isTypeSupported(m)) return m
  }
  return undefined
}

type Phase = 'idle' | 'recording' | 'ready' | 'playing'

function VoiceRecorderPanel({ onChange, onMicError }: VoiceRecorderPanelProps) {
  const [phase, setPhase] = useState<Phase>('idle')
  const [liveSec, setLiveSec] = useState(0)
  const [finalSec, setFinalSec] = useState(0)
  const [hasBlob, setHasBlob] = useState(false)

  const streamRef = useRef<MediaStream | null>(null)
  const recorderRef = useRef<MediaRecorder | null>(null)
  const chunksRef = useRef<Blob[]>([])
  const tickRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const recordMimeRef = useRef('audio/webm')
  const startedAtRef = useRef(0)
  const finalBlobRef = useRef<Blob | null>(null)
  const audioRef = useRef<HTMLAudioElement | null>(null)
  const objectUrlRef = useRef<string | null>(null)
  const playPromiseRef = useRef<Promise<void> | null>(null)

  function clearTick() {
    if (tickRef.current) {
      clearInterval(tickRef.current)
      tickRef.current = null
    }
  }

  function stopMicTracks() {
    streamRef.current?.getTracks().forEach((t) => t.stop())
    streamRef.current = null
    recorderRef.current = null
  }

  function cleanupAudio() {
    const audio = audioRef.current
    const promise = playPromiseRef.current
    audioRef.current = null
    playPromiseRef.current = null
    if (objectUrlRef.current) {
      URL.revokeObjectURL(objectUrlRef.current)
      objectUrlRef.current = null
    }
    if (audio) {
      if (promise) {
        // Wait for play() to resolve before pausing — avoids AbortError
        promise.then(() => audio.pause()).catch(() => {})
      } else {
        audio.pause()
      }
    }
  }

  useEffect(() => {
    return () => {
      clearTick()
      stopMicTracks()
      cleanupAudio()
    }
  }, [])

  async function startRecording() {
    if (typeof MediaRecorder === 'undefined' || !navigator.mediaDevices?.getUserMedia) {
      onMicError?.('הדפדפן לא תומך בהקלטה')
      return
    }

    cleanupAudio()
    finalBlobRef.current = null
    setHasBlob(false)
    setFinalSec(0)
    chunksRef.current = []
    onChange(null)

    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
      streamRef.current = stream

      const mime = pickRecorderMime()
      recordMimeRef.current = mime ?? 'audio/webm'

      let recorder: MediaRecorder
      try {
        recorder = mime ? new MediaRecorder(stream, { mimeType: mime }) : new MediaRecorder(stream)
      } catch {
        recorder = new MediaRecorder(stream)
      }
      recorderRef.current = recorder

      recorder.ondataavailable = (e) => {
        if (e.data.size > 0) chunksRef.current.push(e.data)
      }

      recorder.onstop = () => {
        clearTick()
        const mimeType = recordMimeRef.current
        const blob = new Blob(chunksRef.current, { type: mimeType })
        finalBlobRef.current = blob
        const elapsedSec = Math.max(0, (Date.now() - startedAtRef.current) / 1000)
        setFinalSec(elapsedSec)
        const ready = blob.size > 0
        setHasBlob(ready)
        stopMicTracks()
        setPhase('ready')
        if (ready) onChange({ blob, mimeType, durationSec: elapsedSec })
        else onChange(null)
      }

      startedAtRef.current = Date.now()
      setLiveSec(0)
      setPhase('recording')
      recorder.start(250)

      tickRef.current = setInterval(() => {
        setLiveSec(Math.max(0, (Date.now() - startedAtRef.current) / 1000))
      }, 400)
    } catch (err) {
      stopMicTracks()
      const name = err instanceof DOMException ? err.name : (err as DOMException)?.name ?? ''
      if (name === 'NotAllowedError' || name === 'PermissionDeniedError') {
        onMicError?.('הרשאת מיקרופון נדחתה')
      } else if (name === 'NotFoundError') {
        onMicError?.('לא נמצא מיקרופון במכשיר')
      } else if (name === 'NotReadableError') {
        onMicError?.('המיקרופון תפוס על ידי אפליקציה אחרת')
      } else {
        onMicError?.('לא ניתן לגשת למיקרופון')
      }
    }
  }

  function stopRecording() {
    clearTick()
    if (recorderRef.current?.state === 'recording') recorderRef.current.stop()
  }

  function startPlaying() {
    if (!finalBlobRef.current) return
    cleanupAudio()
    const url = URL.createObjectURL(finalBlobRef.current)
    objectUrlRef.current = url
    const audio = new Audio(url)
    audioRef.current = audio
    audio.onended = () => {
      cleanupAudio()
      setPhase('ready')
    }
    const promise = audio.play()
    playPromiseRef.current = promise
    promise.catch(() => {}) // suppress unhandled-rejection if we pause before play resolves
    setPhase('playing')
  }

  function stopPlaying() {
    cleanupAudio()
    setPhase('ready')
  }

  function resetToIdle() {
    cleanupAudio()
    finalBlobRef.current = null
    setHasBlob(false)
    setPhase('idle')
    setLiveSec(0)
    setFinalSec(0)
    onChange(null)
  }

  function handleMainClick() {
    if (phase === 'idle') void startRecording()
    else if (phase === 'recording') stopRecording()
    else if (phase === 'ready') startPlaying()
    else stopPlaying()
  }

  const isWaveActive = phase === 'recording' || phase === 'playing'
  const displaySec = phase === 'recording' ? liveSec : finalSec

  const mainBtnStyle =
    phase === 'recording'
      ? { background: 'linear-gradient(135deg, #ff4d6d, #d90429)' }
      : phase === 'ready' || phase === 'playing'
        ? { background: 'linear-gradient(135deg, #6366f1, #4f46e5)', boxShadow: '0 6px 18px rgba(99,102,241,0.35)' }
        : { background: 'linear-gradient(135deg, #1fdd72, #08b45c)', boxShadow: '0 6px 18px rgba(31,221,114,0.35)' }

  return (
    <div
      className="inline-flex w-full items-center gap-3 rounded-full border border-white/90 px-3 py-2"
      style={{
        background: 'rgba(255,255,255,0.85)',
        backdropFilter: 'blur(18px)',
        WebkitBackdropFilter: 'blur(18px)',
        boxShadow: '0 6px 28px rgba(0,0,0,0.08)',
      }}
    >
      {/* Main button: mic → stop → play → pause */}
      <button
        type="button"
        onClick={handleMainClick}
        className={`flex h-[44px] w-[44px] shrink-0 items-center justify-center rounded-full text-white transition-all duration-[250ms] touch-manipulation select-none active:scale-95${phase === 'recording' ? ' record-pulse' : ''}`}
        style={mainBtnStyle}
        aria-label={
          phase === 'idle' ? 'התחל הקלטה'
          : phase === 'recording' ? 'עצור הקלטה'
          : phase === 'ready' ? 'נגן הקלטה'
          : 'עצור נגינה'
        }
      >
        {(phase === 'idle' || phase === 'recording') && (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden>
            <path d="M12 14a3 3 0 0 0 3-3V6a3 3 0 0 0-6 0v5a3 3 0 0 0 3 3Z" stroke="currentColor" strokeWidth="2" />
            <path d="M19 11a7 7 0 0 1-14 0" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
          </svg>
        )}
        {phase === 'ready' && (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
            <path d="M8 5v14l11-7z" />
          </svg>
        )}
        {phase === 'playing' && (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
            <rect x="6" y="5" width="4" height="14" rx="1" />
            <rect x="14" y="5" width="4" height="14" rx="1" />
          </svg>
        )}
      </button>

      {/* Timer + wave bars */}
      <div className="flex flex-1 items-center gap-2">
        <span className="w-[38px] text-xs font-semibold tabular-nums tracking-wide text-neutral-900">
          {formatVoiceDurationSec(displaySec)}
        </span>
        <div className="flex h-5 items-center gap-[3px]">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className={`voice-wave-bar${isWaveActive ? ' active' : ''}`} />
          ))}
        </div>
      </div>

      {/* Redo button — only after a recording exists */}
      {(phase === 'ready' || phase === 'playing') && hasBlob && (
        <button
          type="button"
          onClick={resetToIdle}
          className="flex h-[32px] w-[32px] shrink-0 items-center justify-center rounded-full transition hover:scale-105 active:scale-95 touch-manipulation select-none"
          style={{ background: '#f1f3f5', color: '#374151' }}
          aria-label="הקלטה מחדש"
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
            <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8" />
            <path d="M3 3v5h5" />
          </svg>
        </button>
      )}
    </div>
  )
}

export default VoiceRecorderPanel
