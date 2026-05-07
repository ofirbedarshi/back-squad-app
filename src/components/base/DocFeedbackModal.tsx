import Modal from './Modal'
import { useDocFeedback } from '../../hooks/useDocFeedback'
import type { DocFeedbackModalProps } from './docFeedback.types'

function DocFeedbackModal({
  markdown,
  modalTitle,
  shareTitle,
  openButtonAriaLabel,
  openButtonText = 'i',
  shareButtonLabel = 'שתף הערות ב-WhatsApp',
}: DocFeedbackModalProps) {
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

  function handleShareToWhatsApp() {
    const shareUrl = buildWhatsAppShareUrl(shareTitle)
    if (!shareUrl) {
      return
    }

    window.open(shareUrl, '_blank', 'noopener,noreferrer')
  }

  return (
    <>
      <button
        type="button"
        onClick={open}
        className="fixed left-4 bottom-24 z-30 h-12 w-12 rounded-full bg-blue-600 text-white text-2xl font-bold shadow-lg active:bg-blue-700 touch-manipulation"
        aria-label={openButtonAriaLabel}
      >
        {openButtonText}
      </button>

      {isOpen && (
        <Modal title={modalTitle} onClose={close}>
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
