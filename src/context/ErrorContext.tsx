import { createContext, useContext, useState } from 'react'
import DomainErrorAlert from '../components/base/DomainErrorAlert'

type ErrorVariant = 'error' | 'warning'

interface ActiveError {
  message: string
  variant: ErrorVariant
}

interface ErrorContextValue {
  showError: (message: string, variant: ErrorVariant) => void
}

const ErrorContext = createContext<ErrorContextValue | null>(null)

export function ErrorProvider({ children }: { children: React.ReactNode }) {
  const [activeError, setActiveError] = useState<ActiveError | null>(null)

  return (
    <ErrorContext.Provider value={{ showError: (message, variant) => setActiveError({ message, variant }) }}>
      {children}
      {activeError && (
        <DomainErrorAlert
          message={activeError.message}
          variant={activeError.variant}
          onDismiss={() => setActiveError(null)}
        />
      )}
    </ErrorContext.Provider>
  )
}

export function useErrorContext(): ErrorContextValue {
  const ctx = useContext(ErrorContext)
  if (!ctx) throw new Error('useErrorContext must be used within ErrorProvider')
  return ctx
}
