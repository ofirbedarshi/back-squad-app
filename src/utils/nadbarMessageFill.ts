import type {
  NadbarMessageResourceKey,
  NadbarMessageResources,
  NadbarMessageSegment,
  NadbarResourceSegmentFill,
} from './nadbarMessageFill.types'
import { NADBAR_RESOURCE_LOAD_PROMPTS } from './nadbarMessageFill.types'

const TOKEN_RE = /\{\{([a-zA-Z0-9_.]+)\}\}/g

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
    if (!tokenKey || match.index == null) continue

    if (match.index > lastIndex) {
      segments.push({ type: 'text', text: content.slice(lastIndex, match.index) })
    }

    if (tokenKey.includes('.')) {
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
