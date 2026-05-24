import { getNadbarTemplate } from '../domain/nadbarTemplates'
import type { NadbarChatTemplateConfig, NadbarType } from '../domain/nadbar.types'

export function getNadbarChatTemplateUseCase(type: NadbarType): NadbarChatTemplateConfig {
  const template = getNadbarTemplate(type)
  return {
    userVarFields: template.userVarFields,
    blockFooterActions: template.blocks.map((block) =>
      block.footerActions ? [...block.footerActions] : undefined,
    ),
  }
}
