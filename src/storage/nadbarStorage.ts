import type { Nadbar } from '../domain/nadbar.types'

const NADBARS_KEY = 'nadbarim'

function readNadbars(): Nadbar[] {
  const raw = localStorage.getItem(NADBARS_KEY)
  if (!raw) return []
  try {
    return JSON.parse(raw) as Nadbar[]
  } catch {
    return []
  }
}

function writeNadbars(nadbars: Nadbar[]): void {
  localStorage.setItem(NADBARS_KEY, JSON.stringify(nadbars))
}

export function addNadbar(nadbar: Nadbar): void {
  const nadbars = readNadbars()
  nadbars.push(nadbar)
  writeNadbars(nadbars)
}

export function updateNadbar(updated: Nadbar): void {
  const nadbars = readNadbars()
  const next = nadbars.map((item) => (item.id === updated.id ? updated : item))
  writeNadbars(next)
}

export function loadNadbars(): Nadbar[] {
  return readNadbars()
}

export function removeNadbar(id: string): void {
  writeNadbars(readNadbars().filter((item) => item.id !== id))
}

export function removeAllNadbars(): void {
  writeNadbars([])
}
