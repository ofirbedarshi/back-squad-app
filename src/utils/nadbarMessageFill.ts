import type { NadbarMessageResources } from './nadbarMessageFill.types'

const TOKEN_RE = /\{\{([a-zA-Z0-9_.]+)\}\}/g

const TOKEN_GETTERS: Record<string, (resources: NadbarMessageResources) => string | undefined> = {
  'indicator.markCode': (resources) =>
    resources.indicator?.markCode != null ? String(resources.indicator.markCode) : undefined,
  'target.targetName': (resources) => resources.target?.targetName ?? undefined,
  'target.coordinates.east': (resources) => resources.target?.coordinates.east ?? undefined,
  'target.coordinates.north': (resources) => resources.target?.coordinates.north ?? undefined,
}

function escapeHtml(text: string): string {
  return text.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;')
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
    return value != null ? `<u>${escapeHtml(value)}</u>` : full
  })
}
