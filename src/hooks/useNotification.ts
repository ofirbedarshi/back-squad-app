import { useNotificationContext } from '../context/NotificationContext'
import type { NotificationVariant } from '../context/notification.types'

export function useNotification() {
  const { notify } = useNotificationContext()

  function notifySuccess(message: string) {
    notify(message, 'success')
  }

  function notifyError(message: string) {
    notify(message, 'error')
  }

  function notifyInfo(message: string) {
    notify(message, 'info')
  }

  return { notify, notifySuccess, notifyError, notifyInfo }
}

export type { NotificationVariant }
