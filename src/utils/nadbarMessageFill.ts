import type { NadbarMessageResources } from './nadbarMessageFill.types'

const TOKEN_RE = /\{\{([a-zA-Z0-9_.]+)\}\}/g

const TOKEN_GETTERS: Record<string, (resources: NadbarMessageResources) => string | undefined> = {
  'indicator.markCode': (resources) =>
    resources.indicator?.markCode != null ? String(resources.indicator.markCode) : undefined,
}

export function fillNadbarMessageContent(
  content: string,
  resources: NadbarMessageResources,
): string {
  return content.replace(TOKEN_RE, (full, key) => {
    const getter = TOKEN_GETTERS[key]
    if (!getter) return full
    const value = getter(resources)
    return value ?? full
  })
}
