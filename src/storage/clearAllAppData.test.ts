import assert from 'node:assert/strict'
import { afterEach, beforeEach, describe, it } from 'node:test'
import { clearAllAppData } from './clearAllAppData.ts'

const APP_DATA_KEYS = [
  'positions',
  'currentPositionId',
  'referencePositionId',
  'targets',
  'indicators',
  'nadbarim',
  'fireFeasibilityRecords',
  'attackLogs',
  'bachs',
  'missChecklists',
  'targetAids',
  'rshamatz-rehev-checklist',
  'rshamatz-eshkol-checklist',
  'sadap-parisat-dug-checklist',
  'cloudHeight',
] as const

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

describe('clearAllAppData', () => {
  let previousLocalStorage: Storage | undefined

  beforeEach(() => {
    previousLocalStorage = globalThis.localStorage
    globalThis.localStorage = createLocalStorageMock()
    for (const key of APP_DATA_KEYS) {
      localStorage.setItem(key, JSON.stringify({ seeded: true }))
    }
    localStorage.setItem('userNotes', JSON.stringify([{ id: 'n1', text: 'x' }]))
  })

  afterEach(() => {
    if (previousLocalStorage === undefined) {
      Reflect.deleteProperty(globalThis, 'localStorage')
    } else {
      globalThis.localStorage = previousLocalStorage
    }
  })

  it('removes all orchestrated localStorage keys but not userNotes', () => {
    clearAllAppData()

    for (const key of APP_DATA_KEYS) {
      assert.equal(localStorage.getItem(key), null, `expected ${key} cleared`)
    }
    assert.notEqual(localStorage.getItem('userNotes'), null)
  })
})
