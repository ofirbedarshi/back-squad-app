import { useRef, useState } from 'react'
import type { PointerEvent as ReactPointerEvent } from 'react'
import Modal from './Modal'
import { useDocFeedback } from '../../hooks/useDocFeedback'
import type { DocFeedbackModalProps } from './docFeedback.types'
import { applySeedMockData } from '../../dev/seedMockData'

function DocFeedbackModal({
  markdown,
  modalTitle,
  shareTitle,
  openButtonAriaLabel,
  openButtonText = 'i',
  shareButtonLabel = 'שתף הערות ב-WhatsApp',
}: DocFeedbackModalProps) {
  const floatingButtonSize = 48
  const floatingButtonSideOffset = 16
  const floatingButtonBottomOffset = 96
  const initialY =
    typeof window === 'undefined'
      ? floatingButtonBottomOffset
      : Math.max(
          floatingButtonSideOffset,
          window.innerHeight - floatingButtonBottomOffset - floatingButtonSize
        )

  const [buttonPosition, setButtonPosition] = useState({
    x: floatingButtonSideOffset,
    y: initialY,
  })
  const dragStateRef = useRef<{
    pointerId: number
    pointerOffsetX: number
    pointerOffsetY: number
    hasMoved: boolean
  } | null>(null)
  const shouldIgnoreClickRef = useRef(false)

  const [seedDone, setSeedDone] = useState(false)

  const {
    isOpen,
    sections,
    hasComment,
    open,
    close,
    toPlainText,
    generalNote,
    setGeneralNote,
    commentsByBullet,
    visibleInputsByBullet,
    toggleBulletCommentInput,
    handleBulletCommentChange,
    buildWhatsAppShareUrl,
  } = useDocFeedback(markdown)

  function handleSeedMockData() {
    applySeedMockData()
    setSeedDone(true)
    setTimeout(() => {
      window.location.reload()
    }, 800)
  }

  function handleShareToWhatsApp() {
    const shareUrl = buildWhatsAppShareUrl(shareTitle)
    if (!shareUrl) {
      return
    }

    window.open(shareUrl, '_blank', 'noopener,noreferrer')
  }

  function clamp(value: number, min: number, max: number): number {
    return Math.min(Math.max(value, min), max)
  }

  function handleOpenButtonClick() {
    if (shouldIgnoreClickRef.current) {
      shouldIgnoreClickRef.current = false
      return
    }

    open()
  }

  function handleOpenButtonPointerDown(event: ReactPointerEvent<HTMLButtonElement>) {
    const nextOffsetX = event.clientX - buttonPosition.x
    const nextOffsetY = event.clientY - buttonPosition.y

    dragStateRef.current = {
      pointerId: event.pointerId,
      pointerOffsetX: nextOffsetX,
      pointerOffsetY: nextOffsetY,
      hasMoved: false,
    }

    event.currentTarget.setPointerCapture(event.pointerId)
  }

  function handleOpenButtonPointerMove(event: ReactPointerEvent<HTMLButtonElement>) {
    if (!dragStateRef.current) {
      return
    }

    if (dragStateRef.current.pointerId !== event.pointerId) {
      return
    }

    const maxX = window.innerWidth - floatingButtonSize - floatingButtonSideOffset
    const maxY = window.innerHeight - floatingButtonSize - floatingButtonSideOffset
    const nextX = clamp(
      event.clientX - dragStateRef.current.pointerOffsetX,
      floatingButtonSideOffset,
      maxX
    )
    const nextY = clamp(
      event.clientY - dragStateRef.current.pointerOffsetY,
      floatingButtonSideOffset,
      maxY
    )

    const didMoveEnough =
      Math.abs(nextX - buttonPosition.x) > 2 || Math.abs(nextY - buttonPosition.y) > 2
    if (didMoveEnough) {
      dragStateRef.current.hasMoved = true
    }

    setButtonPosition({ x: nextX, y: nextY })
  }

  function handleOpenButtonPointerUp(event: ReactPointerEvent<HTMLButtonElement>) {
    if (!dragStateRef.current) {
      return
    }

    if (dragStateRef.current.pointerId !== event.pointerId) {
      return
    }

    if (dragStateRef.current.hasMoved) {
      shouldIgnoreClickRef.current = true
    }

    dragStateRef.current = null
    event.currentTarget.releasePointerCapture(event.pointerId)
  }

  return (
    <>
      <button
        type="button"
        onClick={handleOpenButtonClick}
        onPointerDown={handleOpenButtonPointerDown}
        onPointerMove={handleOpenButtonPointerMove}
        onPointerUp={handleOpenButtonPointerUp}
        onPointerCancel={handleOpenButtonPointerUp}
        className="fixed z-30 h-12 w-12 rounded-full bg-blue-600 text-white text-2xl font-bold shadow-lg active:bg-blue-700 touch-manipulation select-none"
        style={{
          left: `${buttonPosition.x}px`,
          top: `${buttonPosition.y}px`,
        }}
        aria-label={openButtonAriaLabel}
      >
        {openButtonText}
      </button>

      {isOpen && (
        <Modal
          title={modalTitle}
          onClose={close}
          headerExtra={
            <button
              type="button"
              onClick={handleSeedMockData}
              disabled={seedDone}
              className="text-xs font-semibold text-white bg-orange-500 rounded-xl px-2.5 py-1.5 active:bg-orange-600 touch-manipulation disabled:opacity-40 disabled:pointer-events-none"
            >
              {seedDone ? 'בוצע...' : 'נתוני דמה'}
            </button>
          }
        >
          <div className="flex flex-col gap-5">
            {sections.map((section) => (
              <section key={section.id} className="rounded-2xl border border-neutral-200 p-3 bg-neutral-50">
                <h3 className="font-bold text-neutral-800 mb-2">{section.title}</h3>

                <div className="flex flex-col gap-2 text-sm text-neutral-700">
                  {section.bodyLines.map((line, lineIndex) => {
                    if (!line.startsWith('- ')) {
                      return <p key={`${section.id}-line-${lineIndex}`}>{toPlainText(line)}</p>
                    }

                    const bulletId = `${section.id}-${lineIndex}`
                    const isInputVisible = visibleInputsByBullet[bulletId] ?? false

                    return (
                      <div key={`${section.id}-bullet-${lineIndex}`} className="py-1">
                        <div className="flex items-start justify-between gap-3">
                          <p className="flex-1">• {toPlainText(line.slice(2))}</p>
                          <button
                            type="button"
                            onClick={() => toggleBulletCommentInput(bulletId)}
                            aria-label="הוסף הערה לסעיף"
                            className="h-7 w-7 rounded-full border border-blue-300 text-blue-700 font-bold leading-none active:bg-blue-50"
                          >
                            +
                          </button>
                        </div>

                        {isInputVisible && (
                          <label className="mt-2 flex flex-col gap-1">
                            <span className="text-xs font-semibold text-neutral-600">הערה לסעיף</span>
                            <textarea
                              value={commentsByBullet[bulletId] ?? ''}
                              onChange={(event) => handleBulletCommentChange(bulletId, event.target.value)}
                              rows={2}
                              placeholder="כתוב כאן הערה לסעיף..."
                              className="w-full rounded-xl border border-neutral-300 p-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
                            />
                          </label>
                        )}
                      </div>
                    )
                  })}
                </div>
              </section>
            ))}

            <label className="flex flex-col gap-1 rounded-2xl border border-neutral-200 p-3 bg-neutral-50">
              <span className="text-xs font-semibold text-neutral-700">הערות כלליות למסך</span>
              <textarea
                value={generalNote}
                onChange={(event) => setGeneralNote(event.target.value)}
                rows={3}
                placeholder="כתוב כאן הערות כלליות למסך..."
                className="w-full rounded-xl border border-neutral-300 p-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
              />
            </label>

            <button
              type="button"
              onClick={handleShareToWhatsApp}
              disabled={!hasComment}
              className="w-full rounded-2xl bg-green-600 text-white font-semibold py-3 active:bg-green-700 disabled:bg-neutral-300 disabled:text-neutral-500"
            >
              {shareButtonLabel}
            </button>
          </div>
        </Modal>
      )}
    </>
  )
}

export default DocFeedbackModal
