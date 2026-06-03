import type { TargetAid } from '../domain/targetAid.types'

const TARGET_AIDS_KEY = 'targetAids'

function readTargetAids(): TargetAid[] {
  const raw = localStorage.getItem(TARGET_AIDS_KEY)
  if (!raw) return []
  try {
    return JSON.parse(raw) as TargetAid[]
  } catch {
    return []
  }
}

function writeTargetAids(items: TargetAid[]): void {
  localStorage.setItem(TARGET_AIDS_KEY, JSON.stringify(items))
}

export function addTargetAid(item: TargetAid): void {
  const items = readTargetAids()
  items.push(item)
  writeTargetAids(items)
}

export function loadTargetAids(): TargetAid[] {
  return readTargetAids()
}

export function loadTargetAidById(id: string): TargetAid | undefined {
  return readTargetAids().find((item) => item.id === id)
}

export function updateTargetAid(updated: TargetAid): void {
  const items = readTargetAids()
  writeTargetAids(items.map((item) => (item.id === updated.id ? updated : item)))
}

export function removeTargetAid(id: string): void {
  writeTargetAids(readTargetAids().filter((item) => item.id !== id))
}

export function removeAllTargetAids(): void {
  writeTargetAids([])
}
