import assert from 'node:assert/strict'
import { describe, it } from 'node:test'
import {
  assertAttackLogPitchRoll,
  assertOptionalPitchRollFields,
  assertPitchRollInRange,
  getPitchRollVisualState,
  PITCH_ROLL_MAX_MESSAGE,
  PITCH_ROLL_MIN_MESSAGE,
  PITCH_ROLL_MUST_BE_NUMBER_MESSAGE,
  validatePitchRollValue,
} from './pitchRoll.ts'

describe('validatePitchRollValue', () => {
  it('requires value when required', () => {
    assert.equal(validatePitchRollValue(undefined, { required: true }), PITCH_ROLL_MUST_BE_NUMBER_MESSAGE)
    assert.equal(validatePitchRollValue('', { required: false }), true)
  })

  it('rejects out of range', () => {
    assert.equal(validatePitchRollValue(-10, { required: true }), PITCH_ROLL_MIN_MESSAGE)
    assert.equal(validatePitchRollValue(-11, { required: false }), PITCH_ROLL_MIN_MESSAGE)
    assert.equal(validatePitchRollValue(10.1, { required: false }), PITCH_ROLL_MAX_MESSAGE)
    assert.equal(validatePitchRollValue(11, { required: false }), PITCH_ROLL_MAX_MESSAGE)
  })

  it('accepts valid range', () => {
    assert.equal(validatePitchRollValue(-5, { required: true }), true)
    assert.equal(validatePitchRollValue(0, { required: true }), true)
    assert.equal(validatePitchRollValue(10, { required: true }), true)
    assert.equal(validatePitchRollValue(-6, { required: false }), true)
    assert.equal(validatePitchRollValue(5.5, { required: false }), true)
  })
})

describe('getPitchRollVisualState', () => {
  it('marks warning bands on both sides', () => {
    assert.equal(getPitchRollVisualState(-5), 'normal')
    assert.equal(getPitchRollVisualState(-6), 'warning')
    assert.equal(getPitchRollVisualState(4), 'normal')
    assert.equal(getPitchRollVisualState(5), 'warning')
  })

  it('marks invalid at or below -10 and above 10', () => {
    assert.equal(getPitchRollVisualState(-10), 'invalid')
    assert.equal(getPitchRollVisualState(-10.1), 'invalid')
    assert.equal(getPitchRollVisualState(10.1), 'invalid')
  })
})

describe('assertPitchRollInRange', () => {
  it('throws for invalid values', () => {
    assert.throws(() => assertPitchRollInRange(11, 'Pitch'), /Pitch: ערך מקסימלי הוא 10/)
    assert.throws(() => assertPitchRollInRange(-10, 'Pitch'), /Pitch: ערך לא יכול להיות -10 ומטה/)
    assert.throws(() => assertOptionalPitchRollFields({ pitch: 0, roll: 12 }), /Roll: ערך מקסימלי הוא 10/)
  })

  it('allows optional attack log values', () => {
    assert.doesNotThrow(() => assertAttackLogPitchRoll({}))
    assert.doesNotThrow(() => assertAttackLogPitchRoll({ pitch: -3, roll: 7 }))
    assert.throws(() => assertAttackLogPitchRoll({ pitch: 15 }), /Pitch: ערך מקסימלי הוא 10/)
  })
})
