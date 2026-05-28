import assert from 'node:assert/strict'
import { describe, it } from 'node:test'
import { evaluateObstaclesFeasibilityWhenMissing } from './obstaclesFeasibility.ts'
import { OBSTACLES_FEASIBILITY_MISSING_INPUT_NOTE } from './fireFeasibility.constants.ts'

describe('evaluateObstaclesFeasibilityWhenMissing', () => {
  it('returns enabled true with explanatory note', () => {
    const result = evaluateObstaclesFeasibilityWhenMissing()

    assert.equal(result.enabled, true)
    assert.equal(result.notes, OBSTACLES_FEASIBILITY_MISSING_INPUT_NOTE)
    assert.deepEqual(result.logs, [])
  })
})
