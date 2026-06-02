import { useCallback } from 'react'
import { useErrorContext } from '../context/ErrorContext'

export function useUIError() {
  const { showError } = useErrorContext()

  const reportUIError = useCallback(
    (message: string) => {
      showError(message, 'warning')
    },
    [showError],
  )

  return { reportUIError }
}
