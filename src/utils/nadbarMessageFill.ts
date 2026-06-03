import { isNadbarTargetDerivedVarName } from '../domain/nadbarTargetToVars'
import type {
  NadbarBlockFooterAction,
  NadbarMessage,
  NadbarMessageUserVars,
} from '../domain/nadbar.types'
import type {
  NadbarMessageResourceKey,
  NadbarMessageResources,
  NadbarMessageSegment,
  NadbarResourceSegmentFill,
  NadbarUserVarFallbackDisplay,
} from './nadbarMessageFill.types'
import {
  NADBAR_RESOURCE_LOAD_PROMPTS,
} from './nadbarMessageFill.types'

export const NADBAR_TARGET_LOAD_EMPTY_LABEL = 'יש לטעון מטרה'

const TOKEN_RE = /\{\{([a-zA-Z0-9_.]+)(?:\|([a-zA-Z0-9_]+))?\}\}/g

export type NadbarBlockFooterActionsByBlock = readonly (
  readonly NadbarBlockFooterAction[] | undefined
)[]

const RESOURCE_KEY_BY_TOKEN_PREFIX: Record<string, NadbarMessageResourceKey> = {
  indicator: 'indicator',
  target: 'target',
  position: 'position',
}

const TOKEN_GETTERS: Record<string, (resources: NadbarMessageResources) => string | undefined> = {
  'indicator.markCode': (resources) =>
    resources.indicator?.markCode != null ? String(resources.indicator.markCode) : undefined,
  'target.targetName': (resources) => resources.target?.targetName ?? undefined,
  'target.altitude': (resources) =>
    resources.target?.altitude != null ? String(resources.target.altitude) : undefined,
  'target.coordinates.east': (resources) => resources.target?.coordinates.east ?? undefined,
  'target.coordinates.north': (resources) => resources.target?.coordinates.north ?? undefined,
  'position.stationName': (resources) => resources.position?.stationName ?? undefined,
}

function escapeHtml(text: string): string {
  return text.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;')
}

function resourceKeyFromToken(tokenKey: string): NadbarMessageResourceKey | undefined {
  const prefix = tokenKey.split('.')[0]
  return RESOURCE_KEY_BY_TOKEN_PREFIX[prefix]
}

function missingResourcePromptHtml(resourceKey: NadbarMessageResourceKey): string {
  const prompt = NADBAR_RESOURCE_LOAD_PROMPTS[resourceKey]
  return `<span class="text-red-600 font-medium">${escapeHtml(prompt)}</span>`
}

export function parseNadbarMessageSegments(content: string): NadbarMessageSegment[] {
  const segments: NadbarMessageSegment[] = []
  let lastIndex = 0

  for (const match of content.matchAll(TOKEN_RE)) {
    const tokenKey = match[1]
    const fallbackKey = match[2]
    if (!tokenKey || match.index == null) continue

    if (match.index > lastIndex) {
      segments.push({ type: 'text', text: content.slice(lastIndex, match.index) })
    }

    if (fallbackKey) {
      segments.push({ type: 'userVarFallback', primary: tokenKey, fallback: fallbackKey })
    } else if (tokenKey.includes('.')) {
      segments.push({ type: 'resource', tokenKey })
    } else {
      segments.push({ type: 'userVar', varName: tokenKey })
    }

    lastIndex = match.index + match[0].length
  }

  if (lastIndex < content.length) {
    segments.push({ type: 'text', text: content.slice(lastIndex) })
  }

  return segments
}

export function resolveResourceSegment(
  tokenKey: string,
  resources: NadbarMessageResources,
): NadbarResourceSegmentFill {
  const getter = TOKEN_GETTERS[tokenKey]
  if (!getter) return { type: 'unknown' }

  const value = getter(resources)
  if (value != null) return { type: 'value', value }

  const resourceKey = resourceKeyFromToken(tokenKey)
  if (resourceKey != null && resources[resourceKey] == null) {
    return { type: 'missing', prompt: NADBAR_RESOURCE_LOAD_PROMPTS[resourceKey] }
  }

  return { type: 'unknown' }
}

export function collectUserVarNamesFromContent(content: string): string[] {
  const names: string[] = []
  for (const segment of parseNadbarMessageSegments(content)) {
    if (segment.type === 'userVar') {
      names.push(segment.varName)
    } else if (segment.type === 'userVarFallback') {
      names.push(segment.primary, segment.fallback)
    }
  }
  return names
}

export function buildUserVarFirstMessageIndex(
  messages: readonly NadbarMessage[],
): ReadonlyMap<string, number> {
  const firstIndex = new Map<string, number>()
  messages.forEach((message, index) => {
    for (const varName of collectUserVarNamesFromContent(message.content)) {
      if (!firstIndex.has(varName)) {
        firstIndex.set(varName, index)
      }
    }
  })
  return firstIndex
}

export function isNadbarBlockHasLoadTarget(
  blockFooterActions: NadbarBlockFooterActionsByBlock | undefined,
  blockIndex: number,
): boolean {
  return blockFooterActions?.[blockIndex]?.includes('loadTarget') ?? false
}

export function getFirstNadbarLoadTargetBlockIndex(
  blockFooterActions: NadbarBlockFooterActionsByBlock | undefined,
): number | undefined {
  if (!blockFooterActions?.length) return undefined
  for (let i = 0; i < blockFooterActions.length; i++) {
    if (isNadbarBlockHasLoadTarget(blockFooterActions, i)) {
      return i
    }
  }
  return undefined
}

export function nadbarTemplateHasLoadTarget(
  blockFooterActions: NadbarBlockFooterActionsByBlock | undefined,
): boolean {
  return getFirstNadbarLoadTargetBlockIndex(blockFooterActions) != null
}

export function isNadbarTargetVarLoadOnly(
  blockFooterActions: NadbarBlockFooterActionsByBlock | undefined,
  blockIndex: number,
  varName: string,
): boolean {
  return (
    isNadbarBlockHasLoadTarget(blockFooterActions, blockIndex) &&
    isNadbarTargetDerivedVarName(varName)
  )
}

export interface NadbarUserVarEditableAtOptions {
  blockFooterActions?: NadbarBlockFooterActionsByBlock
  blockIndex?: number
}

export function isNadbarUserVarEditableAt(
  messages: readonly NadbarMessage[],
  messageIndex: number,
  varName: string,
  options?: NadbarUserVarEditableAtOptions,
): boolean {
  if (
    options?.blockFooterActions != null &&
    options.blockIndex != null &&
    isNadbarTargetVarLoadOnly(options.blockFooterActions, options.blockIndex, varName)
  ) {
    return false
  }
  return buildUserVarFirstMessageIndex(messages).get(varName) === messageIndex
}

export function isNadbarMessageVisible(
  message: NadbarMessage,
  messageVars: NadbarMessageUserVars,
): boolean {
  if (!message.visibleWhen) return true
  return messageVars[message.visibleWhen.var] === message.visibleWhen.equals
}

export function filterVisibleNadbarMessages(
  messages: readonly NadbarMessage[],
  messageVars: NadbarMessageUserVars,
): NadbarMessage[] {
  return messages.filter((message) => isNadbarMessageVisible(message, messageVars))
}

export function sanitizeNadbarNumericUserVarInput(value: string): string {
  return value.replace(/\D/g, '')
}

export function resolveNadbarUserVarDisplayValue(
  varName: string,
  blockIndex: number,
  blockMessageVars: readonly NadbarMessageUserVars[],
  varInitialFromBlock: Readonly<Record<string, number>> | undefined,
): string {
  const blockVars = blockMessageVars[blockIndex]
  if (blockVars != null && Object.prototype.hasOwnProperty.call(blockVars, varName)) {
    return blockVars[varName] ?? ''
  }

  const sourceBlockIndex = varInitialFromBlock?.[varName]
  if (sourceBlockIndex == null || sourceBlockIndex === blockIndex) return ''

  return blockMessageVars[sourceBlockIndex]?.[varName] ?? ''
}

export function resolveNadbarUserVarFallbackDisplayValue(
  primary: string,
  fallback: string,
  blockIndex: number,
  blockMessageVars: readonly NadbarMessageUserVars[],
  varInitialFromBlock: Readonly<Record<string, number>> | undefined,
): NadbarUserVarFallbackDisplay {
  const primaryValue = resolveNadbarUserVarDisplayValue(
    primary,
    blockIndex,
    blockMessageVars,
    varInitialFromBlock,
  )
  if (primaryValue.trim()) {
    return { value: primaryValue, activeVar: primary }
  }

  const fallbackValue = resolveNadbarUserVarDisplayValue(
    fallback,
    blockIndex,
    blockMessageVars,
    varInitialFromBlock,
  )
  return { value: fallbackValue, activeVar: fallback }
}

export function fillNadbarMessageContent(
  content: string,
  resources: NadbarMessageResources,
): string {
  const safe = escapeHtml(content)
  return safe.replace(TOKEN_RE, (full, key) => {
    const getter = TOKEN_GETTERS[key]
    if (!getter) return full
    const value = getter(resources)
    if (value != null) return `<u>${escapeHtml(value)}</u>`

    const resourceKey = resourceKeyFromToken(key)
    if (resourceKey != null && resources[resourceKey] == null) {
      return missingResourcePromptHtml(resourceKey)
    }

    return full
  })
}
