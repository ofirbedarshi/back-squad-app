import { getNadbarTemplate } from '../domain/nadbarTemplates'
import type { NadbarBlockFooterAction, NadbarType } from '../domain/nadbar.types'

export function getNadbarBlockFooterActionsUseCase(
  type: NadbarType,
): readonly (readonly NadbarBlockFooterAction[] | undefined)[] {
  return getNadbarTemplate(type).blocks.map((block) =>
    block.footerActions ? [...block.footerActions] : undefined,
  )
}
