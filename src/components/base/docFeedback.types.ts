export type DocSection = {
  id: string
  title: string
  bodyLines: string[]
}

export type CommentsBySection = Record<string, string>

export type DocFeedbackModalProps = {
  markdown: string
  modalTitle: string
  shareTitle: string
  openButtonAriaLabel: string
  openButtonText?: string
  shareButtonLabel?: string
}
