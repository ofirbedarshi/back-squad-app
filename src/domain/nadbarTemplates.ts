import pointerTeamTemplate from '../data/nadbar-templates/PointerTeam.template.json'
import pointerTeamUpdatedTemplate from '../data/nadbar-templates/PointerTeamUpdated.template.json'
import katmamTemplate from '../data/nadbar-templates/Katmam.template.json'
import tzurPointerTemplate from '../data/nadbar-templates/TzurPointer.template.json'
import { parseNadbarTemplate } from './nadbar'
import type { NadbarTemplate, NadbarType } from './nadbar.types'

const TEMPLATES_BY_TYPE: Record<NadbarType, NadbarTemplate> = {
  PointerTeam: parseNadbarTemplate(pointerTeamTemplate),
  PointerTeamUpdated: parseNadbarTemplate(pointerTeamUpdatedTemplate),
  Katmam: parseNadbarTemplate(katmamTemplate),
  TzurPointer: parseNadbarTemplate(tzurPointerTemplate),
}

export function getNadbarTemplate(type: NadbarType): NadbarTemplate {
  const template = TEMPLATES_BY_TYPE[type]
  return {
    blocks: template.blocks.map((block) => ({
      messages: block.messages.map((message) => ({ ...message })),
      ...(block.footerActions ? { footerActions: [...block.footerActions] } : {}),
    })),
    ...(template.userVarFields
      ? {
          userVarFields: Object.fromEntries(
            Object.entries(template.userVarFields).map(([varName, spec]) => [varName, { ...spec }]),
          ),
        }
      : {}),
  }
}
