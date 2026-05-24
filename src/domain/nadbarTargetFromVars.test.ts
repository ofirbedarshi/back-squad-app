import assert from 'node:assert/strict'
import { describe, it } from 'node:test'
import {
  buildTargetInputFromNadbarMessageVars,
  validateNadbarTargetFromVarsInput,
} from './nadbarTargetFromVars.ts'

describe('validateNadbarTargetFromVarsInput', () => {
  const validInput = {
    targetName: 'מטרה 1',
    coordinates: { east: '123456', north: '3123456', palach: '36' },
    altitude: 420,
  }

  it('accepts valid input', () => {
    assert.doesNotThrow(() => validateNadbarTargetFromVarsInput(validInput))
  })

  it('rejects empty target name', () => {
    assert.throws(
      () => validateNadbarTargetFromVarsInput({ ...validInput, targetName: '  ' }),
      /שם מטרה: שדה חובה/,
    )
  })

  it('rejects invalid east coordinate', () => {
    assert.throws(
      () =>
        validateNadbarTargetFromVarsInput({
          ...validInput,
          coordinates: { ...validInput.coordinates, east: '12345' },
        }),
      /מזרחי: יש להזין 6 ספרות/,
    )
  })

  it('rejects invalid north coordinate', () => {
    assert.throws(
      () =>
        validateNadbarTargetFromVarsInput({
          ...validInput,
          coordinates: { ...validInput.coordinates, north: '312345' },
        }),
      /צפוני: יש להזין 7 ספרות/,
    )
  })

  it('rejects missing altitude', () => {
    assert.throws(
      () => validateNadbarTargetFromVarsInput({ ...validInput, altitude: undefined }),
      /גובה: שדה חובה/,
    )
  })

  it('rejects non-finite altitude', () => {
    assert.throws(
      () => validateNadbarTargetFromVarsInput({ ...validInput, altitude: Number.NaN }),
      /גובה: שדה חובה/,
    )
  })
})

describe('buildTargetInputFromNadbarMessageVars', () => {
  it('maps nadbar vars to target input with default palach', () => {
    const input = buildTargetInputFromNadbarMessageVars({
      metara: 'מטרה א',
      meraom: '654321',
      tsepa: '3765432',
      gamal: '512',
    })

    assert.deepEqual(input, {
      targetName: 'מטרה א',
      coordinates: { east: '654321', north: '3765432', palach: '36' },
      altitude: 512,
    })
  })

  it('throws when gamal is missing', () => {
    assert.throws(
      () =>
        buildTargetInputFromNadbarMessageVars({
          metara: 'מטרה א',
          meraom: '654321',
          tsepa: '3765432',
        }),
      /גובה: שדה חובה/,
    )
  })

  it('throws when gamal is not a number', () => {
    assert.throws(
      () =>
        buildTargetInputFromNadbarMessageVars({
          metara: 'מטרה א',
          meraom: '654321',
          tsepa: '3765432',
          gamal: 'abc',
        }),
      /גובה: שדה חובה/,
    )
  })
})
