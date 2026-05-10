import { createContext, useCallback, useContext, useState } from 'react'
import ConfirmDialog from '../components/base/ConfirmDialog'
import type { ConfirmContextValue, ConfirmOptions } from './confirm.types'

const ConfirmContext = createContext<ConfirmContextValue | null>(null)

type Pending = ConfirmOptions & { resolve: (confirmed: boolean) => void }

const DEFAULT_TITLE = 'אישור פעולה'
const DEFAULT_CONFIRM = 'אישור'
const DEFAULT_CANCEL = 'ביטול'

export function ConfirmProvider({ children }: { children: React.ReactNode }) {
  const [pending, setPending] = useState<Pending | null>(null)

  const confirm = useCallback((options: ConfirmOptions) => {
    return new Promise<boolean>((resolve) => {
      setPending((prev) => {
        if (prev) {
          prev.resolve(false)
        }
        return { ...options, resolve }
      })
    })
  }, [])

  const finish = useCallback((confirmed: boolean) => {
    setPending((current) => {
      if (current) {
        current.resolve(confirmed)
      }
      return null
    })
  }, [])

  const variant = pending?.variant ?? 'default'
  const title = pending?.title ?? DEFAULT_TITLE
  const message = pending?.message ?? ''
  const confirmLabel = pending?.confirmLabel ?? DEFAULT_CONFIRM
  const cancelLabel = pending?.cancelLabel ?? DEFAULT_CANCEL

  return (
    <ConfirmContext.Provider value={{ confirm }}>
      {children}
      {pending ? (
        <ConfirmDialog
          title={title}
          message={message}
          confirmLabel={confirmLabel}
          cancelLabel={cancelLabel}
          variant={variant}
          onConfirm={() => finish(true)}
          onCancel={() => finish(false)}
        />
      ) : null}
    </ConfirmContext.Provider>
  )
}

export function useConfirmContext(): ConfirmContextValue {
  const ctx = useContext(ConfirmContext)
  if (!ctx) {
    throw new Error('useConfirmContext must be used within ConfirmProvider')
  }
  return ctx
}
