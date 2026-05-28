import assert from 'node:assert/strict'
import { afterEach, beforeEach, describe, it } from 'node:test'
import type { FireFeasibilityFormData } from '../domain/fireFeasibility.types'
import { calculateFireFeasibility } from './calculateFireFeasibility'

const CLOUD_HEIGHT_KEY = 'cloudHeight'

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

function createFormData(): FireFeasibilityFormData {
  return {
    positionToTargetRange: 9750,
    positionToTargetHeightDifference: 800,
    targetAltitudeMeters: 1200,
    flightPath: 'flat',
    obstacle: null,
  }
}

describe('calculateFireFeasibility', () => {
  let previousLocalStorage: Storage | undefined

  beforeEach(() => {
    previousLocalStorage = globalThis.localStorage
    globalThis.localStorage = createLocalStorageMock()
    localStorage.setItem(
      CLOUD_HEIGHT_KEY,
      JSON.stringify({ heightMeters: 5000, displayUnit: 'meters' }),
    )
  })

  afterEach(() => {
    if (previousLocalStorage === undefined) {
      Reflect.deleteProperty(globalThis, 'localStorage')
    } else {
      globalThis.localStorage = previousLocalStorage
    }
  })

  it('stores hit-probability logs under flightPaths.b, not clouds', () => {
    const results = calculateFireFeasibility(createFormData())

    assert.equal(results.flightPaths.a.percentByFlightPath.flat, 0)
    assert.equal(results.flightPaths.a.percentByFlightPath.low, 0)
    assert.equal(results.flightPaths.a.percentByFlightPath.lofted, 0)
    assert.equal(results.flightPaths.a.percentByFlightPath['+lofted'], 0)
    assert.equal(results.flightPaths.a.logs.length, 0)

    assert.equal(results.flightPaths.b.percentByFlightPath.flat, 5)
    assert.equal(results.flightPaths.b.percentByFlightPath.low, 5)
    assert.equal(results.flightPaths.b.percentByFlightPath.lofted, 50)
    assert.equal(results.flightPaths.b.percentByFlightPath['+lofted'], 60)
    assert.ok(results.flightPaths.b.logs.some((line) => line.includes('חישוב סיכויי פגיעה')))

    const cloudsLogsText = [...results.clouds.a.logs, ...results.clouds.b.logs].join('\n')
    assert.equal(cloudsLogsText.includes('חישוב סיכויי פגיעה'), false)
  })
})
