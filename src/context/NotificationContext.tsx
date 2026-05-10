import { createContext, useCallback, useContext, useRef, useState } from 'react'
import ToastNotification from '../components/base/ToastNotification'
import type { ActiveNotification, NotificationContextValue, NotificationVariant } from './notification.types'

const AUTO_DISMISS_MS = 2500

const NotificationContext = createContext<NotificationContextValue | null>(null)

export function NotificationProvider({ children }: { children: React.ReactNode }) {
  const [active, setActive] = useState<ActiveNotification | null>(null)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const dismiss = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current)
      timerRef.current = null
    }
    setActive(null)
  }, [])

  const notify = useCallback((message: string, variant: NotificationVariant = 'success') => {
    if (timerRef.current) {
      clearTimeout(timerRef.current)
    }

    setActive({ id: String(Date.now()), message, variant })

    timerRef.current = setTimeout(dismiss, AUTO_DISMISS_MS)
  }, [dismiss])

  return (
    <NotificationContext.Provider value={{ notify }}>
      {children}
      {active && (
        <ToastNotification
          key={active.id}
          message={active.message}
          variant={active.variant}
          onDismiss={dismiss}
        />
      )}
    </NotificationContext.Provider>
  )
}

export function useNotificationContext(): NotificationContextValue {
  const ctx = useContext(NotificationContext)
  if (!ctx) throw new Error('useNotificationContext must be used within NotificationProvider')
  return ctx
}
