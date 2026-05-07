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
    commentsBySection,
    handleCommentChange,
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
                  {section.bodyLines.map((line, lineIndex) =>
                    line.startsWith('- ') ? (
                      <p key={`${section.id}-bullet-${lineIndex}`}>• {toPlainText(line.slice(2))}</p>
                    ) : (
                      <p key={`${section.id}-line-${lineIndex}`}>{toPlainText(line)}</p>
                    ),
                  )}
                </div>

                <label className="mt-3 flex flex-col gap-1">
                  <span className="text-xs font-semibold text-neutral-600">הערה לקטע זה</span>
                  <textarea
                    value={commentsBySection[section.id] ?? ''}
                    onChange={(event) => handleCommentChange(section.id, event.target.value)}
                    rows={3}
                    placeholder="כתוב כאן הערה או תוספת..."
                    className="w-full rounded-xl border border-neutral-300 p-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-300"
                  />
                </label>
              </section>
            ))}

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
