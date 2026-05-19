import pointerTeamTemplate from '../data/nadbar-templates/PointerTeam.template.json'
import katmamTemplate from '../data/nadbar-templates/Katmam.template.json'
import tzurPointerTemplate from '../data/nadbar-templates/TzurPointer.template.json'
import { parseNadbarTemplate } from './nadbar'
import type { NadbarTemplate, NadbarType } from './nadbar.types'

const TEMPLATES_BY_TYPE: Record<NadbarType, NadbarTemplate> = {
  PointerTeam: parseNadbarTemplate(pointerTeamTemplate),
  Katmam: parseNadbarTemplate(katmamTemplate),
  TzurPointer: parseNadbarTemplate(tzurPointerTemplate),
}

export function getNadbarTemplate(type: NadbarType): NadbarTemplate {
  return {
    messages: TEMPLATES_BY_TYPE[type].messages.map((message) => ({ ...message })),
  }
}
