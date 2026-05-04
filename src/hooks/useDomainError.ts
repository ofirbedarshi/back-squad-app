import { useErrorContext } from '../context/ErrorContext'

export function useDomainError() {
  const { showError } = useErrorContext()

  function triggerError(message: string) {
    showError(message, 'error')
  }

  return { triggerError }
}
