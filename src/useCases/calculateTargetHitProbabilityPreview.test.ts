import assert from 'node:assert/strict'
import { afterEach, beforeEach, describe, it } from 'node:test'
import type { Position } from '../domain/position.types'
import { buildHitProbabilityFlightPathResultsByGeneration } from './buildHitProbabilityFlightPathResultsByGeneration.ts'
import { calculateTargetHitProbabilityPreviewUseCase } from './calculateTargetHitProbabilityPreview.ts'

const POSITIONS_KEY = 'positions'
const CURRENT_POSITION_ID_KEY = 'currentPositionId'

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

function seedReferencePosition(position: Position): void {
  localStorage.setItem(POSITIONS_KEY, JSON.stringify([position]))
  localStorage.setItem(CURRENT_POSITION_ID_KEY, position.id)
}

describe('calculateTargetHitProbabilityPreviewUseCase', () => {
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

  it('returns null when live metrics cannot be computed', () => {
    const result = calculateTargetHitProbabilityPreviewUseCase({
      targetCoordinates: { east: '100', north: '200' },
      targetHeight: undefined,
    })

    assert.equal(result, null)
  })

  it('matches shared builder when reference position and target height exist', () => {
    seedReferencePosition({
      id: 'pos-1',
      positionName: 'עמדה',
      coordinates: { east: '0', north: '0' },
      altitude: 100,
      updatedAt: new Date().toISOString(),
    })

    const targetCoordinates = { east: '0', north: '9750' }
    const preview = calculateTargetHitProbabilityPreviewUseCase({
      targetCoordinates,
      targetHeight: 900,
    })

    assert.ok(preview)
    const expected = buildHitProbabilityFlightPathResultsByGeneration({
      positionToTargetRangeMeters: 9750,
      positionToTargetHeightDifferenceMeters: 800,
    })
    assert.deepEqual(preview, expected)
  })
})
