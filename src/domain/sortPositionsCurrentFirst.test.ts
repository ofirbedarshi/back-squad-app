import { describe, expect, it } from 'vitest'
import { sortPositionsCurrentFirst } from './sortPositionsCurrentFirst'
import type { Position } from './position.types'

function pos(id: string): Position {
  return {
    id,
    savedAt: '',
    stationName: id,
    coordinates: { east: '0', north: '0', palach: '0' },
    altitude: 0,
  }
}

describe('sortPositionsCurrentFirst', () => {
  it('puts current id first', () => {
    const a = pos('a')
    const b = pos('b')
    const c = pos('c')
    expect(sortPositionsCurrentFirst([a, b, c], 'b').map((p) => p.id)).toEqual(['b', 'a', 'c'])
  })

  it('returns original order when no current id', () => {
    const list = [pos('x'), pos('y')]
    expect(sortPositionsCurrentFirst(list, undefined)).toEqual(list)
  })
})
