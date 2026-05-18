import assert from 'node:assert/strict'
import { describe, it } from 'node:test'
import {
  AZIMUTH_MAX_MESSAGE,
  AZIMUTH_MUST_BE_NUMBER_MESSAGE,
  AZIMUTH_MIN_MESSAGE,
  validateAzimuthDegreeValue,
} from './azimuthDegree.ts'

describe('validateAzimuthDegreeValue', () => {
  it('required empty fails', () => {
    assert.equal(validateAzimuthDegreeValue('', { required: true }), 'שדה חובה')
    assert.equal(validateAzimuthDegreeValue('  ', { required: true }), 'שדה חובה')
  })

  it('optional empty passes', () => {
    assert.equal(validateAzimuthDegreeValue('', { required: false }), true)
  })

  it('non-numeric fails', () => {
    assert.equal(validateAzimuthDegreeValue('abc', { required: true }), AZIMUTH_MUST_BE_NUMBER_MESSAGE)
    assert.equal(validateAzimuthDegreeValue('12x', { required: false }), AZIMUTH_MUST_BE_NUMBER_MESSAGE)
  })

  it('range boundaries', () => {
    assert.equal(validateAzimuthDegreeValue('0', { required: true }), true)
    assert.equal(validateAzimuthDegreeValue('359.9', { required: true }), true)
    assert.equal(validateAzimuthDegreeValue('-1', { required: true }), AZIMUTH_MIN_MESSAGE)
    assert.equal(validateAzimuthDegreeValue('360', { required: true }), AZIMUTH_MAX_MESSAGE)
  })
})
