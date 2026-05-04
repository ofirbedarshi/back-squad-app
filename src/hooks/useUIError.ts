import { useErrorContext } from '../context/ErrorContext'

export function useUIError() {
  const { showError } = useErrorContext()

  function reportUIError(message: string) {
    showError(message, 'warning')
  }

  return { reportUIError }
}
