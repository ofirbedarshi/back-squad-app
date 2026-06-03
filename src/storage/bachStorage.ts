import type { Bach } from '../domain/bach.types'

const BACHS_KEY = 'bachs'

function readBachs(): Bach[] {
  const raw = localStorage.getItem(BACHS_KEY)
  if (!raw) return []
  try {
    return JSON.parse(raw) as Bach[]
  } catch {
    return []
  }
}

function writeBachs(bachs: Bach[]): void {
  localStorage.setItem(BACHS_KEY, JSON.stringify(bachs))
}

export function addBach(bach: Bach): void {
  const bachs = readBachs()
  bachs.push(bach)
  writeBachs(bachs)
}

export function loadBachs(): Bach[] {
  return readBachs()
}

export function loadBachById(id: string): Bach | undefined {
  return readBachs().find((bach) => bach.id === id)
}

export function updateBach(updated: Bach): void {
  const bachs = readBachs()
  const next = bachs.map((bach) => (bach.id === updated.id ? updated : bach))
  writeBachs(next)
}

export function removeBach(id: string): void {
  const bachs = readBachs()
  writeBachs(bachs.filter((bach) => bach.id !== id))
}

export function removeAllBachs(): void {
  writeBachs([])
}
