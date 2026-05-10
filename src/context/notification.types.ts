export type NotificationVariant = 'success' | 'error' | 'info'

export interface ActiveNotification {
  id: string
  message: string
  variant: NotificationVariant
}

export interface NotificationContextValue {
  notify: (message: string, variant?: NotificationVariant) => void
}
