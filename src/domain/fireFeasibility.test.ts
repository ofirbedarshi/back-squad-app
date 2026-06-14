import assert from 'node:assert/strict'
import { describe, it } from 'node:test'
import {
  applyFireFeasibilityRecordUpdate,
  createEmptyFireFeasibilityFormData,
  createNotImplementedCategoryResultsByGeneration,
  createNotImplementedHitProbabilityGenerationResult,
  getFireFeasibilityFlowInitFromRecord,
  hasAnyFireFeasibilityCategoryEnabled,
} from './fireFeasibility'
import type { FireFeasibilityCategoryResult, FireFeasibilityRecord } from './fireFeasibility.types'

function createMinimalResults() {
  return {
    clouds: createNotImplementedCategoryResultsByGeneration(),
    obstacles: createNotImplementedCategoryResultsByGeneration(),
    concealment: createNotImplementedCategoryResultsByGeneration(),
    flightPaths: {
      a: createNotImplementedHitProbabilityGenerationResult(),
      b: createNotImplementedHitProbabilityGenerationResult(),
    },
  }
}

function createCoordsRecord(overrides: Partial<FireFeasibilityRecord> = {}): FireFeasibilityRecord {
  return {
    id: 'record-1',
    updatedAt: '2026-06-01T10:00:00.000Z',
    mode: 'coords',
    targetId: 'target-1',
    positionId: 'position-1',
    formData: {
      ...createEmptyFireFeasibilityFormData(),
      positionToTargetRange: 5000,
      positionToTargetHeightDifference: -1000,
      targetAltitudeMeters: 200,
      flightPath: 'low',
    },
    results: createMinimalResults(),
    ...overrides,
  }
}

describe('applyFireFeasibilityRecordUpdate', () => {
  it('keeps id, merges input, and bumps updatedAt', () => {
    const existing = createCoordsRecord()
    const updated = applyFireFeasibilityRecordUpdate(existing, {
      mode: 'coords',
      targetId: 'target-2',
      positionId: 'position-2',
      formData: existing.formData,
      results: existing.results,
    })

    assert.equal(updated.id, 'record-1')
    assert.equal(updated.targetId, 'target-2')
    assert.equal(updated.positionId, 'position-2')
    assert.notEqual(updated.updatedAt, existing.updatedAt)
  })
})

describe('getFireFeasibilityFlowInitFromRecord', () => {
  it('returns coords init with saved formData', () => {
    const record = createCoordsRecord()
    const init = getFireFeasibilityFlowInitFromRecord(record)

    assert.equal(init.mode, 'coords')
    assert.equal(init.positionId, 'position-1')
    assert.equal(init.targetId, 'target-1')
    assert.equal(init.formData.flightPath, 'low')
    assert.equal(init.formData.positionToTargetRange, 5000)
  })

  it('seeds distances-heights range from record fields', () => {
    const record: FireFeasibilityRecord = {
      id: 'record-2',
      updatedAt: '2026-06-01T10:00:00.000Z',
      mode: 'distances-heights',
      positionId: 'position-1',
      rangeMeters: 4200,
      heightDifferenceMeters: 300,
      formData: createEmptyFireFeasibilityFormData(),
      results: createMinimalResults(),
    }

    const init = getFireFeasibilityFlowInitFromRecord(record)

    assert.equal(init.mode, 'distances-heights')
    assert.equal(init.targetId, undefined)
    assert.equal(init.formData.positionToTargetRange, 4200)
    assert.equal(init.formData.positionToTargetHeightDifference, 300)
  })

  it('falls back to empty formData when legacy record has no formData', () => {
    const legacyRecord = {
      id: 'legacy-1',
      updatedAt: '2026-06-01T10:00:00.000Z',
      mode: 'coords' as const,
      targetId: 'target-1',
      positionId: 'position-1',
      results: createMinimalResults(),
    } as FireFeasibilityRecord

    const init = getFireFeasibilityFlowInitFromRecord(legacyRecord)

    assert.equal(init.formData.flightPath, 'flat')
    assert.equal(init.formData.obstacle, null)
  })
})

function createCategoryResults(
  a: Partial<FireFeasibilityCategoryResult>,
  b: Partial<FireFeasibilityCategoryResult>,
) {
  const disabled: FireFeasibilityCategoryResult = { enabled: false, notes: '', logs: [] }
  return {
    a: { ...disabled, ...a },
    b: { ...disabled, ...b },
  }
}

describe('hasAnyFireFeasibilityCategoryEnabled', () => {
  it('returns false when all six category results are disabled', () => {
    const allDisabled = createNotImplementedCategoryResultsByGeneration()
    assert.equal(
      hasAnyFireFeasibilityCategoryEnabled({
        clouds: allDisabled,
        obstacles: allDisabled,
        concealment: allDisabled,
      }),
      false,
    )
  })

  it('returns true when only one category result is enabled', () => {
    assert.equal(
      hasAnyFireFeasibilityCategoryEnabled({
        clouds: createCategoryResults({ enabled: true }, {}),
        obstacles: createNotImplementedCategoryResultsByGeneration(),
        concealment: createNotImplementedCategoryResultsByGeneration(),
      }),
      true,
    )
  })

  it('returns true when missing-input defaults mark obstacles or concealment as enabled', () => {
    const enabledWithNote: FireFeasibilityCategoryResult = {
      enabled: true,
      notes: 'לא הוזנו נתונים',
      logs: [],
    }
    assert.equal(
      hasAnyFireFeasibilityCategoryEnabled({
        clouds: createNotImplementedCategoryResultsByGeneration(),
        obstacles: { a: createNotImplementedCategoryResultsByGeneration().a, b: enabledWithNote },
        concealment: { a: enabledWithNote, b: enabledWithNote },
      }),
      true,
    )
  })
})
