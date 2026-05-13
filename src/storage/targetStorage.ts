import type { Target } from '../domain/target.types'

const TARGETS_KEY = 'targets'

function readTargets(): Target[] {
  const raw = localStorage.getItem(TARGETS_KEY)
  if (!raw) return []
  try {
    return JSON.parse(raw) as Target[]
  } catch {
    return []
  }
}

function writeTargets(targets: Target[]): void {
  localStorage.setItem(TARGETS_KEY, JSON.stringify(targets))
}

export function addTarget(target: Target): void {
  const targets = readTargets()
  targets.push(target)
  writeTargets(targets)
}

export function updateTarget(updated: Target): void {
  const targets = readTargets()
  const next = targets.map((target) => (target.id === updated.id ? updated : target))
  writeTargets(next)
}

export function loadTargets(): Target[] {
  return readTargets()
}

export function removeTarget(id: string): void {
  const targets = readTargets()
  writeTargets(targets.filter((target) => target.id !== id))
}

export function removeAllTargets(): void {
  writeTargets([])
}
