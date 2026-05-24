import { nowIsoUtc } from './nowIsoUtc'
import {
  NADBAR_MESSAGE_SOURCES,
  NADBAR_TYPES,
  type Nadbar,
  type NadbarMessage,
  type NadbarMessageSource,
  type NadbarLinks,
  type NadbarLinksUpdate,
  type NadbarMessageUserVars,
  type NadbarTemplate,
  type NadbarType,
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
    messages: nadbar.messages,
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

function isNadbarMessage(value: unknown): value is NadbarMessage {
  if (!value || typeof value !== 'object') return false
  const record = value as Record<string, unknown>
  return isNadbarMessageSource(record.source) && typeof record.content === 'string'
}

export function parseNadbarTemplate(raw: unknown): NadbarTemplate {
  if (!raw || typeof raw !== 'object') {
    throw new Error('תבנית נדבר לא תקינה')
  }
  const record = raw as Record<string, unknown>
  if (!Array.isArray(record.messages) || record.messages.length === 0) {
    throw new Error('תבנית נדבר חייבת לכלול הודעות')
  }
  if (!record.messages.every(isNadbarMessage)) {
    throw new Error('תבנית נדבר מכילה הודעות לא תקינות')
  }
  return {
    messages: record.messages.map((message) => ({
      source: message.source,
      content: message.content,
    })),
  }
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
    messages: template.messages.map((message) => ({ ...message })),
  }
}

export function isValidNadbar(value: unknown): value is Nadbar {
  if (!value || typeof value !== 'object') return false
  const record = value as Record<string, unknown>
  return (
    typeof record.id === 'string' &&
    typeof record.createdAt === 'string' &&
    typeof record.updatedAt === 'string' &&
    typeof record.type === 'string' &&
    isNadbarType(record.type) &&
    Array.isArray(record.messages) &&
    record.messages.length > 0 &&
    record.messages.every(isNadbarMessage) &&
    isNadbarLinks(record.links) &&
    isNadbarMessageUserVars(record.messageVars)
  )
}
