import type { NadbarMessageUserVars } from './nadbar.types'

export const HAS_NEARBY_OBSTACLES_VAR = 'hasNearbyObstacles'
export const OBSTACLE_ACTIVE_2_VAR = 'obstacleActive2'
export const OBSTACLE_ACTIVE_3_VAR = 'obstacleActive3'

const EXTRA_OBSTACLE_VAR_NAMES = [
  OBSTACLE_ACTIVE_2_VAR,
  OBSTACLE_ACTIVE_3_VAR,
  'obstacleHeight2',
  'obstacleDistance2',
  'obstacleHeight3',
  'obstacleDistance3',
] as const

export function canAddObstacleGroup(messageVars: NadbarMessageUserVars): boolean {
  return (
    messageVars[HAS_NEARBY_OBSTACLES_VAR] === 'חיובי' &&
    messageVars[OBSTACLE_ACTIVE_3_VAR] !== '1'
  )
}

export function addNextObstacleGroup(messageVars: NadbarMessageUserVars): NadbarMessageUserVars {
  if (!canAddObstacleGroup(messageVars)) {
    throw new Error('לא ניתן להוסיף הסתר נוסף')
  }

  if (messageVars[OBSTACLE_ACTIVE_2_VAR] !== '1') {
    return { ...messageVars, [OBSTACLE_ACTIVE_2_VAR]: '1' }
  }

  return { ...messageVars, [OBSTACLE_ACTIVE_3_VAR]: '1' }
}

export function clearExtraObstacleGroups(messageVars: NadbarMessageUserVars): NadbarMessageUserVars {
  const next = { ...messageVars }
  for (const varName of EXTRA_OBSTACLE_VAR_NAMES) {
    delete next[varName]
  }
  return next
}
