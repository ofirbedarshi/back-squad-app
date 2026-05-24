import { getNadbarTemplate } from '../domain/nadbarTemplates'
import type { NadbarType, NadbarUserVarFields } from '../domain/nadbar.types'

export function getNadbarUserVarFieldsUseCase(type: NadbarType): NadbarUserVarFields | undefined {
  return getNadbarTemplate(type).userVarFields
}
