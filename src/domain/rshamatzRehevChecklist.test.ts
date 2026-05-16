import { describe, expect, it } from 'vitest'
import {
  createDefaultRshamatzRehevChecklist,
  normalizeRshamatzRehevChecklist,
  toggleChecklistItem,
} from './rshamatzRehevChecklist'

describe('rshamatzRehevChecklist', () => {
  it('createDefaultRshamatzRehevChecklist returns empty state', () => {
    expect(createDefaultRshamatzRehevChecklist()).toEqual({ checked: {}, notes: '' })
  })

  it('toggleChecklistItem toggles item checked state', () => {
    expect(toggleChecklistItem({}, 'jack')).toEqual({ jack: true })
    expect(toggleChecklistItem({ jack: true }, 'jack')).toEqual({ jack: false })
  })

  it('normalizeRshamatzRehevChecklist returns defaults for invalid input', () => {
    expect(normalizeRshamatzRehevChecklist(null)).toEqual({ checked: {}, notes: '' })
    expect(normalizeRshamatzRehevChecklist('bad')).toEqual({ checked: {}, notes: '' })
  })

  it('normalizeRshamatzRehevChecklist keeps valid checked and notes', () => {
    expect(
      normalizeRshamatzRehevChecklist({
        checked: { jack: true },
        notes: 'test',
      })
    ).toEqual({ checked: { jack: true }, notes: 'test' })
  })
})
