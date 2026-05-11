import type { Bach, BachInput } from './bach.types'

export function createBach(input: BachInput): Bach {
  return {
    id: crypto.randomUUID(),
    createdAt: Date.now(),
    ...input,
  }
}
