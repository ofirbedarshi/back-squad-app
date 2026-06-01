import type { Nadbar, NadbarMessageUserVars } from './nadbar.types'
import type { Target } from './target.types'

export function hasFilledNadbarBlockTarget(vars: NadbarMessageUserVars | undefined): boolean {
  return Boolean(vars?.metara?.trim())
}

export function findTargetIdFromNadbarBlockVars(
  vars: NadbarMessageUserVars,
  targets: Target[],
): string | undefined {
  const targetName = vars.metara?.trim()
  if (!targetName) return undefined

  const east = vars.meraom?.trim()
  const north = vars.tsepa?.trim()
  const byName = targets.filter((target) => target.targetName === targetName)
  if (byName.length === 0) return undefined

  if (east && north) {
    const exact = byName.find(
      (target) => target.coordinates.east === east && target.coordinates.north === north,
    )
    if (exact) return exact.id
  }

  if (byName.length === 1) return byName[0]!.id
  return undefined
}

/** Last block (by index) with a filled target name; matches saved targets when possible. */
export function resolveLastFilledNadbarBlockTargetId(
  nadbar: Nadbar,
  targets: Target[],
): string | undefined {
  const blocks = nadbar.blockMessageVars
  if (!blocks?.length) return undefined

  for (let i = blocks.length - 1; i >= 0; i--) {
    const vars = blocks[i]
    if (!hasFilledNadbarBlockTarget(vars)) continue
    const id = findTargetIdFromNadbarBlockVars(vars!, targets)
    if (id) return id
  }

  return undefined
}

export function resolveLastFilledNadbarBlockTargetName(
  nadbar: Nadbar,
  targets: Target[],
): string | undefined {
  const blocks = nadbar.blockMessageVars
  if (!blocks?.length) return undefined

  for (let i = blocks.length - 1; i >= 0; i--) {
    const vars = blocks[i]
    const metara = vars?.metara?.trim()
    if (!metara) continue

    const id = findTargetIdFromNadbarBlockVars(vars!, targets)
    if (id) {
      const target = targets.find((item) => item.id === id)
      return target?.targetName ?? metara
    }

    return metara
  }

  return undefined
}
