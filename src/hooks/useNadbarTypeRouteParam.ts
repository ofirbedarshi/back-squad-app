import { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { isNadbarType } from '../domain/nadbar'
import type { NadbarType } from '../domain/nadbar.types'
import { useDomainError } from './useDomainError'

export function useNadbarTypeRouteParam(): NadbarType | null {
  const { type: typeParam } = useParams<{ type: string }>()
  const navigate = useNavigate()
  const { triggerError } = useDomainError()

  const nadbarType =
    typeParam && isNadbarType(typeParam) ? typeParam : null

  useEffect(() => {
    if (!nadbarType) {
      triggerError('סוג נדבר לא תקין')
      navigate('/nadbarim', { replace: true })
    }
  }, [nadbarType, navigate, triggerError])

  return nadbarType
}
