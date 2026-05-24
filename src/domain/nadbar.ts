import { nowIsoUtc } from './nowIsoUtc'
import {
  NADBAR_MESSAGE_SOURCES,
  NADBAR_TYPES,
  type Nadbar,
  type NadbarMessage,
  type NadbarMessageBlock,
  type NadbarMessageSource,
  type NadbarLinks,
  type NadbarLinksUpdate,
  type NadbarMessageUserVars,
  type NadbarTemplate,
  type NadbarTemplateBlock,
  type NadbarType,
  type NadbarUserVarFields,
  NADBAR_BLOCK_FOOTER_ACTIONS,
  type NadbarBlockFooterAction,
} from './nadbar.types'

export function isNadbarType(value: string): value is NadbarType {
  return (NADBAR_TYPES as readonly string[]).includes(value)
}

export function nadbarRequiresEntityLinks(type: NadbarType): boolean {
  return type !== 'PointerTeamUpdated'
}

function isNadbarMessageSource(value: unknown): value is NadbarMessageSource {
  return typeof value === 'string' && (NADBAR_MESSAGE_SOURCES as readonly string[]).includes(value)
}

function isOptionalEntityId(value: unknown): boolean {
  return value === undefined || (typeof value === 'string' && value.length > 0)
}

function isNadbarMessageUserVars(value: unknown): boolean {
  if (value === undefined) return true
  if (!value || typeof value !== 'object' || Array.isArray(value)) return false
  return Object.values(value as Record<string, unknown>).every((entry) => typeof entry === 'string')
}

function normalizeMessageVars(vars: NadbarMessageUserVars | undefined): NadbarMessageUserVars | undefined {
  if (!vars) return undefined
  const next: NadbarMessageUserVars = {}
  for (const [key, value] of Object.entries(vars)) {
    if (value !== '') next[key] = value
  }
  return Object.keys(next).length > 0 ? next : undefined
}

function isNadbarLinks(value: unknown): boolean {
  if (value === undefined) return true
  if (!value || typeof value !== 'object') return false
  const record = value as Record<string, unknown>
  return (
    isOptionalEntityId(record.pointerId) &&
    isOptionalEntityId(record.targetId) &&
    isOptionalEntityId(record.positionId)
  )
}

export const NADBAR_SAVE_LINKS_REQUIRED_MESSAGE =
  'לא ניתן לשמור. וודא שעמדה מטרה ומציין טעונים'

export function hasCompleteNadbarLinks(links: NadbarLinks | undefined): boolean {
  return Boolean(links?.pointerId && links?.targetId && links?.positionId)
}

export function assertNadbarLinksForSave(links: NadbarLinks | undefined): void {
  if (!hasCompleteNadbarLinks(links)) {
    throw new Error(NADBAR_SAVE_LINKS_REQUIRED_MESSAGE)
  }
}

function copyMessageBlocks(blocks: readonly NadbarMessageBlock[]): NadbarMessageBlock[] {
  return blocks.map((block) => ({
    messages: block.messages.map((message) => ({ ...message })),
  }))
}

export function normalizeNadbar(nadbar: Nadbar): Nadbar {
  const pointerId = nadbar.links?.pointerId
  const targetId = nadbar.links?.targetId
  const positionId = nadbar.links?.positionId
  const messageVars = normalizeMessageVars(nadbar.messageVars)

  const base: Nadbar = {
    id: nadbar.id,
    createdAt: nadbar.createdAt,
    updatedAt: nadbar.updatedAt,
    type: nadbar.type,
    messageBlocks: copyMessageBlocks(nadbar.messageBlocks),
    ...(messageVars ? { messageVars } : {}),
  }

  if (!pointerId && !targetId && !positionId) {
    return base
  }

  return {
    ...base,
    links: {
      ...(pointerId ? { pointerId } : {}),
      ...(targetId ? { targetId } : {}),
      ...(positionId ? { positionId } : {}),
    },
  }
}

function mergeNadbarLinks(current: NadbarLinks | undefined, update: NadbarLinksUpdate): NadbarLinks | undefined {
  const next: NadbarLinks = { ...current }

  if (update.pointerId !== undefined) {
    if (update.pointerId === null || update.pointerId === '') {
      delete next.pointerId
    } else {
      next.pointerId = update.pointerId
    }
  }

  if (update.targetId !== undefined) {
    if (update.targetId === null || update.targetId === '') {
      delete next.targetId
    } else {
      next.targetId = update.targetId
    }
  }

  if (update.positionId !== undefined) {
    if (update.positionId === null || update.positionId === '') {
      delete next.positionId
    } else {
      next.positionId = update.positionId
    }
  }

  return next.pointerId || next.targetId || next.positionId ? next : undefined
}

function isNadbarMessageVisibleWhen(value: unknown): value is NadbarMessage['visibleWhen'] {
  if (value === undefined) return true
  if (!value || typeof value !== 'object' || Array.isArray(value)) return false
  const record = value as Record<string, unknown>
  return typeof record.var === 'string' && record.var.length > 0 && typeof record.equals === 'string'
}

function parseMessageVisibleWhen(value: unknown): NadbarMessage['visibleWhen'] {
  if (value === undefined) return undefined
  if (!isNadbarMessageVisibleWhen(value)) {
    throw new Error('תבנית נדבר: visibleWhen לא תקין')
  }
  return { var: value.var, equals: value.equals }
}

function isNadbarMessage(value: unknown): value is NadbarMessage {
  if (!value || typeof value !== 'object') return false
  const record = value as Record<string, unknown>
  return (
    isNadbarMessageSource(record.source) &&
    typeof record.content === 'string' &&
    isNadbarMessageVisibleWhen(record.visibleWhen)
  )
}

function isNadbarMessageBlock(value: unknown): value is NadbarMessageBlock {
  if (!value || typeof value !== 'object') return false
  const record = value as Record<string, unknown>
  return (
    Array.isArray(record.messages) &&
    record.messages.length > 0 &&
    record.messages.every(isNadbarMessage)
  )
}

function parseChoiceOptions(value: unknown): readonly string[] {
  if (!Array.isArray(value) || value.length < 2) {
    throw new Error('תבנית נדבר: אפשרויות בחירה לא תקינות')
  }
  const options = value.map((entry) => {
    if (typeof entry !== 'string' || entry.trim() === '') {
      throw new Error('תבנית נדבר: אפשרויות בחירה לא תקינות')
    }
    return entry
  })
  return options
}

function parseUserVarFieldsFromRecord(record: Record<string, unknown>): NadbarUserVarFields | undefined {
  if (record.userVarFields === undefined) return undefined
  const raw = record.userVarFields
  if (!raw || typeof raw !== 'object' || Array.isArray(raw)) {
    throw new Error('תבנית נדבר: userVarFields לא תקין')
  }

  const userVarFields: NadbarUserVarFields = {}
  for (const [varName, spec] of Object.entries(raw as Record<string, unknown>)) {
    if (!varName) {
      throw new Error('תבנית נדבר: userVarFields לא תקין')
    }
    if (!spec || typeof spec !== 'object' || Array.isArray(spec)) {
      throw new Error('תבנית נדבר: userVarFields לא תקין')
    }
    const specRecord = spec as Record<string, unknown>
    const input = specRecord.input
    if (input === 'numeric') {
      userVarFields[varName] = { input: 'numeric' }
      continue
    }
    if (input === 'choice') {
      const options = parseChoiceOptions(specRecord.options)
      userVarFields[varName] = { input: 'choice', options }
      continue
    }
    throw new Error('תבנית נדבר: סוג קלט לא נתמך')
  }

  return Object.keys(userVarFields).length > 0 ? userVarFields : undefined
}

export function isNadbarUserVarNumeric(
  userVarFields: NadbarUserVarFields | undefined,
  varName: string,
): boolean {
  return userVarFields?.[varName]?.input === 'numeric'
}

export function isNadbarUserVarChoice(
  userVarFields: NadbarUserVarFields | undefined,
  varName: string,
): boolean {
  return userVarFields?.[varName]?.input === 'choice'
}

function isNadbarBlockFooterAction(value: unknown): value is NadbarBlockFooterAction {
  return typeof value === 'string' && (NADBAR_BLOCK_FOOTER_ACTIONS as readonly string[]).includes(value)
}

function parseBlockFooterActions(value: unknown): NadbarBlockFooterAction[] | undefined {
  if (value === undefined) return undefined
  if (!Array.isArray(value) || value.length === 0) {
    throw new Error('תבנית נדבר: footerActions לא תקין')
  }
  if (!value.every(isNadbarBlockFooterAction)) {
    throw new Error('תבנית נדבר: פעולת בלוק לא נתמכת')
  }
  return value
}

function isNadbarTemplateBlock(value: unknown): value is NadbarTemplateBlock {
  if (!value || typeof value !== 'object') return false
  const record = value as Record<string, unknown>
  if (!Array.isArray(record.messages) || record.messages.length === 0) {
    return false
  }
  if (!record.messages.every(isNadbarMessage)) {
    return false
  }
  if (record.footerActions !== undefined) {
    try {
      parseBlockFooterActions(record.footerActions)
    } catch {
      return false
    }
  }
  return true
}

function parseMessageBlocksFromRecord(record: Record<string, unknown>): NadbarTemplateBlock[] {
  if (!Array.isArray(record.blocks) || record.blocks.length === 0) {
    throw new Error('תבנית נדבר חייבת לכלול בלוקים')
  }
  if (!record.blocks.every(isNadbarTemplateBlock)) {
    throw new Error('תבנית נדבר מכילה בלוקים לא תקינים')
  }
  return record.blocks.map((block) => ({
    messages: block.messages.map((message) => {
      const rawMessage = message as NadbarMessage & { visibleWhen?: unknown }
      const visibleWhen = parseMessageVisibleWhen(rawMessage.visibleWhen)
      return {
        source: message.source,
        content: message.content,
        ...(visibleWhen ? { visibleWhen } : {}),
      }
    }),
    ...(block.footerActions ? { footerActions: [...block.footerActions] } : {}),
  }))
}

export function parseNadbarTemplate(raw: unknown): NadbarTemplate {
  if (!raw || typeof raw !== 'object') {
    throw new Error('תבנית נדבר לא תקינה')
  }
  const record = raw as Record<string, unknown>
  const blocks = parseMessageBlocksFromRecord(record)
  const userVarFields = parseUserVarFieldsFromRecord(record)
  return userVarFields ? { blocks, userVarFields } : { blocks }
}

export function applyNadbarLinks(nadbar: Nadbar, links: NadbarLinksUpdate): Nadbar {
  const normalized = normalizeNadbar(nadbar)
  const mergedLinks = mergeNadbarLinks(normalized.links, links)
  const now = nowIsoUtc()

  if (!mergedLinks) {
    const { links: _links, ...rest } = normalized
    return { ...rest, updatedAt: now }
  }

  return {
    ...normalized,
    updatedAt: now,
    links: mergedLinks,
  }
}

export function createNadbarFromTemplate(type: NadbarType, template: NadbarTemplate): Nadbar {
  const now = nowIsoUtc()
  return {
    id: crypto.randomUUID(),
    createdAt: now,
    updatedAt: now,
    type,
    messageBlocks: copyMessageBlocks(template.blocks),
  }
}

export function isValidNadbar(value: unknown): value is Nadbar {
  if (!value || typeof value !== 'object') return false
  const record = value as Record<string, unknown>
  if (
    record.messages !== undefined ||
    record.pointerId !== undefined ||
    record.targetId !== undefined ||
    record.positionId !== undefined
  ) {
    return false
  }
  return (
    typeof record.id === 'string' &&
    typeof record.createdAt === 'string' &&
    typeof record.updatedAt === 'string' &&
    typeof record.type === 'string' &&
    isNadbarType(record.type) &&
    Array.isArray(record.messageBlocks) &&
    record.messageBlocks.length > 0 &&
    record.messageBlocks.every(isNadbarMessageBlock) &&
    isNadbarLinks(record.links) &&
    isNadbarMessageUserVars(record.messageVars)
  )
}
