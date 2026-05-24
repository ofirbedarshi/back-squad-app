import assert from 'node:assert/strict'
import { describe, it } from 'node:test'
import {
  addNextObstacleGroup,
  canAddObstacleGroup,
  clearExtraObstacleGroups,
  HAS_NEARBY_OBSTACLES_VAR,
  OBSTACLE_ACTIVE_2_VAR,
  OBSTACLE_ACTIVE_3_VAR,
} from './nadbarObstacles'

describe('canAddObstacleGroup', () => {
  it('is false when choice is missing or שלילי', () => {
    assert.equal(canAddObstacleGroup({}), false)
    assert.equal(canAddObstacleGroup({ [HAS_NEARBY_OBSTACLES_VAR]: 'שלילי' }), false)
  })

  it('is true when חיובי and fewer than 3 groups active', () => {
    assert.equal(canAddObstacleGroup({ [HAS_NEARBY_OBSTACLES_VAR]: 'חיובי' }), true)
    assert.equal(
      canAddObstacleGroup({ [HAS_NEARBY_OBSTACLES_VAR]: 'חיובי', [OBSTACLE_ACTIVE_2_VAR]: '1' }),
      true,
    )
  })

  it('is false when third group already active', () => {
    assert.equal(
      canAddObstacleGroup({
        [HAS_NEARBY_OBSTACLES_VAR]: 'חיובי',
        [OBSTACLE_ACTIVE_2_VAR]: '1',
        [OBSTACLE_ACTIVE_3_VAR]: '1',
      }),
      false,
    )
  })
})

describe('addNextObstacleGroup', () => {
  it('activates group 2 then group 3', () => {
    const base = { [HAS_NEARBY_OBSTACLES_VAR]: 'חיובי' }
    const with2 = addNextObstacleGroup(base)
    assert.equal(with2[OBSTACLE_ACTIVE_2_VAR], '1')
    assert.equal(with2[OBSTACLE_ACTIVE_3_VAR], undefined)

    const with3 = addNextObstacleGroup(with2)
    assert.equal(with3[OBSTACLE_ACTIVE_2_VAR], '1')
    assert.equal(with3[OBSTACLE_ACTIVE_3_VAR], '1')
  })

  it('throws when max groups reached', () => {
    assert.throws(
      () =>
        addNextObstacleGroup({
          [HAS_NEARBY_OBSTACLES_VAR]: 'חיובי',
          [OBSTACLE_ACTIVE_2_VAR]: '1',
          [OBSTACLE_ACTIVE_3_VAR]: '1',
        }),
      /לא ניתן להוסיף הסתר נוסף/,
    )
  })
})

describe('clearExtraObstacleGroups', () => {
  it('removes activation flags and extra height/distance vars', () => {
    const cleared = clearExtraObstacleGroups({
      [HAS_NEARBY_OBSTACLES_VAR]: 'שלילי',
      [OBSTACLE_ACTIVE_2_VAR]: '1',
      [OBSTACLE_ACTIVE_3_VAR]: '1',
      obstacleHeight2: '10',
      obstacleDistance2: '20',
      obstacleHeight3: '30',
      obstacleDistance3: '40',
      obstacleHeight1: '5',
      obstacleDistance1: '6',
    })

    assert.equal(cleared[HAS_NEARBY_OBSTACLES_VAR], 'שלילי')
    assert.equal(cleared.obstacleHeight1, '5')
    assert.equal(cleared.obstacleDistance1, '6')
    assert.equal(cleared[OBSTACLE_ACTIVE_2_VAR], undefined)
    assert.equal(cleared[OBSTACLE_ACTIVE_3_VAR], undefined)
    assert.equal(cleared.obstacleHeight2, undefined)
    assert.equal(cleared.obstacleDistance3, undefined)
  })
})
