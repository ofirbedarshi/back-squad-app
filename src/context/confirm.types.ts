export type ConfirmVariant = 'default' | 'danger'

export interface ConfirmOptions {
  /** Shown above the message */
  title?: string
  message: string
  confirmLabel?: string
  cancelLabel?: string
  variant?: ConfirmVariant
}

export interface ConfirmContextValue {
  confirm: (options: ConfirmOptions) => Promise<boolean>
}
