import assert from 'node:assert/strict'
import { afterEach, beforeEach, describe, it } from 'node:test'
import {
  createEmptyFireFeasibilityFormData,
  createNotImplementedCategoryResultsByGeneration,
  createNotImplementedHitProbabilityGenerationResult,
} from '../domain/fireFeasibility'
import type { FireFeasibilityRecord } from '../domain/fireFeasibility.types'
import { saveFireFeasibilityRecordUseCase } from './saveFireFeasibilityRecord'
import { updateFireFeasibilityRecordUseCase } from './updateFireFeasibilityRecord'

const FIRE_FEASIBILITY_RECORDS_KEY = 'fireFeasibilityRecords'

function createLocalStorageMock(): Storage {
  const store = new Map<string, string>()
  return {
    get length() {
      return store.size
    },
    clear() {
      store.clear()
    },
    getItem(key: string) {
      return store.get(key) ?? null
    },
    key(index: number) {
      return [...store.keys()][index] ?? null
    },
    removeItem(key: string) {
      store.delete(key)
    },
    setItem(key: string, value: string) {
      store.set(key, value)
    },
  }
}

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

describe('updateFireFeasibilityRecordUseCase', () => {
  let previousLocalStorage: Storage | undefined

  beforeEach(() => {
    previousLocalStorage = globalThis.localStorage
    globalThis.localStorage = createLocalStorageMock()
  })

  afterEach(() => {
    if (previousLocalStorage === undefined) {
      Reflect.deleteProperty(globalThis, 'localStorage')
    } else {
      globalThis.localStorage = previousLocalStorage
    }
  })

  it('updates an existing record in storage', () => {
    const formData = {
      ...createEmptyFireFeasibilityFormData(),
      positionToTargetRange: 5000,
      positionToTargetHeightDifference: -1000,
    }
    const results = createMinimalResults()

    const created = saveFireFeasibilityRecordUseCase({
      mode: 'distances-heights',
      positionId: 'position-1',
      rangeMeters: 5000,
      heightDifferenceMeters: -1000,
      formData,
      results,
    })

    const updatedResults = createMinimalResults()
    const updated = updateFireFeasibilityRecordUseCase(created.id, {
      mode: 'distances-heights',
      positionId: 'position-2',
      rangeMeters: 6000,
      heightDifferenceMeters: -500,
      formData: {
        ...formData,
        positionToTargetRange: 6000,
        positionToTargetHeightDifference: -500,
      },
      results: updatedResults,
    })

    assert.equal(updated.id, created.id)
    assert.equal(updated.positionId, 'position-2')
    assert.equal(updated.rangeMeters, 6000)
    assert.notEqual(updated.updatedAt, created.updatedAt)

    const stored = JSON.parse(localStorage.getItem(FIRE_FEASIBILITY_RECORDS_KEY) ?? '[]') as FireFeasibilityRecord[]
    assert.equal(stored.length, 1)
    assert.equal(stored[0]?.positionId, 'position-2')
  })

  it('throws when record id is missing', () => {
    assert.throws(
      () =>
        updateFireFeasibilityRecordUseCase('missing-id', {
          mode: 'distances-heights',
          positionId: 'position-1',
          rangeMeters: 1000,
          heightDifferenceMeters: 100,
          formData: createEmptyFireFeasibilityFormData(),
          results: createMinimalResults(),
        }),
      /הרשומה לא נמצאה/,
    )
  })
})
