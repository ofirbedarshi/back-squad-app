import { describe, expect, it } from 'vitest'
import { attackLogInputToFormValues, formValuesToAttackLogInput } from './attackLogForm'
import type { AttackLogInput } from './attackLog.types'

describe('formValuesToAttackLogInput', () => {
  it('maps Hebrew toggles and parses numeric strings', () => {
    const input = formValuesToAttackLogInput({
      targetName: 'מטרה 1',
      date: '2026-06-03',
      wasAttacked: 'כן',
      hit: true,
      generation: 'דור ב׳',
      stationTargetRange: '1200.5',
      stationTargetAzimuth: '45',
      indicatorFactor: '42',
      targetId: 't-1',
      stationPositionId: 'p-1',
      indicatorId: 'i-1',
    })

    expect(input.wasAttacked).toBe('yes')
    expect(input.hit).toBe(true)
    expect(input.generation).toBe('b')
    expect(input.stationTargetRange).toBe(1200.5)
    expect(input.stationTargetAzimuth).toBe(45)
    expect(input.indicatorFactor).toBe(42)
    expect(input.targetId).toBe('t-1')
    expect(input.stationPositionId).toBe('p-1')
    expect(input.indicatorId).toBe('i-1')
  })

  it('defaults wasAttacked to no when toggle missing', () => {
    const input = formValuesToAttackLogInput({
      targetName: 'x',
      date: '2026-01-01',
    })
    expect(input.wasAttacked).toBe('no')
    expect(input.generation).toBe('a')
  })
})

describe('attackLogInputToFormValues', () => {
  it('round-trips toggle and numeric fields', () => {
    const attackLog: AttackLogInput = {
      targetName: 'Alpha',
      date: '2026-06-03',
      wasAttacked: 'yes',
      hit: true,
      generation: 'b',
      stationTargetRange: 500,
      indicatorTargetAzimuth: 180,
      targetId: 'tid',
    }

    const form = attackLogInputToFormValues(attackLog)
    expect(form.wasAttacked).toBe('כן')
    expect(form.generation).toBe('דור ב׳')
    expect(form.stationTargetRange).toBe('500')
    expect(form.indicatorTargetAzimuth).toBe('180')
    expect(form.targetId).toBe('tid')

    const back = formValuesToAttackLogInput(form)
    expect(back.wasAttacked).toBe('yes')
    expect(back.generation).toBe('b')
    expect(back.stationTargetRange).toBe(500)
    expect(back.indicatorTargetAzimuth).toBe(180)
  })
})
