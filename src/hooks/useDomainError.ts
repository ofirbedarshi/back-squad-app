import { useCallback } from 'react'
import { useErrorContext } from '../context/ErrorContext'

export function useDomainError() {
  const { showError } = useErrorContext()

  const triggerError = useCallback(
    (message: string) => {
      showError(message, 'error')
    },
    [showError],
  )

  return { triggerError }
}
