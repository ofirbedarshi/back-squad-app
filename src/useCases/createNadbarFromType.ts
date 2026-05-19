import { createNadbarFromTemplate } from '../domain/nadbar'
import { getNadbarTemplate } from '../domain/nadbarTemplates'
import type { Nadbar, NadbarType } from '../domain/nadbar.types'

export function createNadbarFromTypeUseCase(type: NadbarType): Nadbar {
  const template = getNadbarTemplate(type)
  return createNadbarFromTemplate(type, template)
}
