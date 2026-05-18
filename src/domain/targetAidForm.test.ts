import { describe, expect, it } from 'vitest'
import { createDefaultTargetAidForm, normalizeTargetAidForm } from './targetAidForm'

describe('targetAidForm', () => {
  it('createDefaultTargetAidForm matches normalize of null', () => {
    expect(normalizeTargetAidForm(null)).toEqual(createDefaultTargetAidForm())
  })

  it('normalizeTargetAidForm restores coords and strings', () => {
    const base = createDefaultTargetAidForm()
    const raw = {
      ...base,
      targetId: 't1',
      targetCoords: { east: '1', north: '2', palach: '3' },
      delayType: 'הקשה',
      notes: 'hello',
    }
    expect(normalizeTargetAidForm(raw).targetId).toBe('t1')
    expect(normalizeTargetAidForm(raw).targetCoords).toEqual({ east: '1', north: '2', palach: '3' })
    expect(normalizeTargetAidForm(raw).delayType).toBe('הקשה')
    expect(normalizeTargetAidForm(raw).notes).toBe('hello')
  })

  it('normalizeTargetAidForm coerces timeOfFlight string to number', () => {
    expect(normalizeTargetAidForm({ timeOfFlight: '12.5' }).timeOfFlight).toBe(12.5)
    expect(normalizeTargetAidForm({ timeOfFlight: 9 }).timeOfFlight).toBe(9)
  })

  it('normalizeTargetAidForm coerces bad coords to empty strings', () => {
    const out = normalizeTargetAidForm({
      targetCoords: { east: 1, north: null, palach: undefined },
    })
    expect(out.targetCoords).toEqual({ east: '', north: '', palach: '' })
  })
})