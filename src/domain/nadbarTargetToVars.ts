import type { Nadbar, NadbarMessageBlock, NadbarMessageUserVars } from './nadbar.types'
import type { Target } from './target.types'
import { collectUserVarNamesFromContent } from '../utils/nadbarMessageFill'

const TARGET_DERIVED_VAR_NAMES = ['metara', 'meraom', 'tsepa', 'gamal', 'amura'] as const

export type NadbarTargetDerivedVarName = (typeof TARGET_DERIVED_VAR_NAMES)[number]

export function isNadbarTargetDerivedVarName(varName: string): varName is NadbarTargetDerivedVarName {
  return (TARGET_DERIVED_VAR_NAMES as readonly string[]).includes(varName)
}

export function collectBlockUserVarNames(block: NadbarMessageBlock): string[] {
  const names = new Set<string>()
  for (const message of block.messages) {
    for (const varName of collectUserVarNamesFromContent(message.content)) {
      names.add(varName)
    }
  }
  return [...names]
}

export function resolveNadbarVarFromTarget(
  varName: string,
  target: Target,
  azimuth?: number,
): string | undefined {
  switch (varName) {
    case 'metara':
      return target.targetName
    case 'meraom':
      return target.coordinates.east
    case 'tsepa':
      return target.coordinates.north
    case 'gamal':
      return target.altitude != null ? String(Math.round(target.altitude)) : undefined
    case 'amura':
      return azimuth != null ? String(Math.round(azimuth)) : undefined
    default:
      return undefined
  }
}

export function buildBlockMessageVarsFromTarget(
  block: NadbarMessageBlock,
  target: Target,
  azimuth?: number,
): NadbarMessageUserVars {
  const vars: NadbarMessageUserVars = {}
  for (const varName of collectBlockUserVarNames(block)) {
    const value = resolveNadbarVarFromTarget(varName, target, azimuth)
    if (value !== undefined) {
      vars[varName] = value
    }
  }
  return vars
}

export function applyTargetToNadbarBlock(
  nadbar: Nadbar,
  blockIndex: number,
  target: Target,
  azimuth?: number,
): Nadbar {
  const block = nadbar.messageBlocks[blockIndex]
  if (!block) {
    throw new Error('בלוק נדבר לא נמצא')
  }

  const blockCount = nadbar.messageBlocks.length
  const current = nadbar.blockMessageVars ?? Array.from({ length: blockCount }, () => ({}))
  const next = [...current]
  while (next.length < blockCount) {
    next.push({})
  }

  const derivedVars = buildBlockMessageVarsFromTarget(block, target, azimuth)
  next[blockIndex] = { ...(next[blockIndex] ?? {}), ...derivedVars }

  return { ...nadbar, blockMessageVars: next }
}

export function clearTargetDerivedBlockVars(
  nadbar: Nadbar,
  blockIndex: number,
  block: NadbarMessageBlock,
): Nadbar {
  const blockCount = nadbar.messageBlocks.length
  const current = nadbar.blockMessageVars ?? Array.from({ length: blockCount }, () => ({}))
  const next = [...current]
  while (next.length < blockCount) {
    next.push({})
  }

  const blockVars: NadbarMessageUserVars = { ...(next[blockIndex] ?? {}) }
  for (const varName of collectBlockUserVarNames(block)) {
    if (isNadbarTargetDerivedVarName(varName)) {
      delete blockVars[varName]
    }
  }

  next[blockIndex] = blockVars
  return { ...nadbar, blockMessageVars: next }
}

export function applyTargetToNadbarBlocksFrom(
  nadbar: Nadbar,
  fromBlockIndex: number,
  target: Target,
  azimuth?: number,
): Nadbar {
  if (!nadbar.messageBlocks[fromBlockIndex]) {
    throw new Error('בלוק נדבר לא נמצא')
  }

  let updated = nadbar
  for (let i = fromBlockIndex; i < nadbar.messageBlocks.length; i++) {
    updated = applyTargetToNadbarBlock(updated, i, target, azimuth)
  }
  return updated
}

export function clearTargetDerivedBlockVarsFrom(
  nadbar: Nadbar,
  fromBlockIndex: number,
): Nadbar {
  if (!nadbar.messageBlocks[fromBlockIndex]) {
    throw new Error('בלוק נדבר לא נמצא')
  }

  let updated = nadbar
  for (let i = fromBlockIndex; i < nadbar.messageBlocks.length; i++) {
    const block = nadbar.messageBlocks[i]!
    updated = clearTargetDerivedBlockVars(updated, i, block)
  }
  return updated
}

export function propagateTargetDerivedVarsFromBlock(
  nadbar: Nadbar,
  fromBlockIndex: number,
): Nadbar {
  if (!nadbar.messageBlocks[fromBlockIndex]) {
    throw new Error('בלוק נדבר לא נמצא')
  }

  const blockCount = nadbar.messageBlocks.length
  const current = nadbar.blockMessageVars ?? Array.from({ length: blockCount }, () => ({}))
  const next = [...current]
  while (next.length < blockCount) {
    next.push({})
  }

  const sourceVars = next[fromBlockIndex] ?? {}

  for (let i = fromBlockIndex + 1; i < blockCount; i++) {
    const destBlock = nadbar.messageBlocks[i]!
    const toMerge: NadbarMessageUserVars = {}
    for (const varName of collectBlockUserVarNames(destBlock)) {
      if (
        isNadbarTargetDerivedVarName(varName) &&
        Object.prototype.hasOwnProperty.call(sourceVars, varName)
      ) {
        toMerge[varName] = sourceVars[varName]
      }
    }
    if (Object.keys(toMerge).length > 0) {
      next[i] = { ...(next[i] ?? {}), ...toMerge }
    }
  }

  return { ...nadbar, blockMessageVars: next }
}
