import {
  NADBAR_MESSAGE_SOURCES,
  NADBAR_TYPES,
  type Nadbar,
  type NadbarMessage,
  type NadbarMessageSource,
  type NadbarTemplate,
  type NadbarType,
} from './nadbar.types'

export function isNadbarType(value: string): value is NadbarType {
  return (NADBAR_TYPES as readonly string[]).includes(value)
}

function isNadbarMessageSource(value: unknown): value is NadbarMessageSource {
  return typeof value === 'string' && (NADBAR_MESSAGE_SOURCES as readonly string[]).includes(value)
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

export function createNadbarFromTemplate(type: NadbarType, template: NadbarTemplate): Nadbar {
  const now = new Date().toISOString()
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
    record.messages.every(isNadbarMessage)
  )
}
