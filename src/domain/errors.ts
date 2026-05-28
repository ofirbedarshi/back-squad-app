export class CloudsFeasibilityOutOfTableError extends Error {
  constructor(
    message = 'אין נתון בטבלת עננים לשילוב טווח, הפרש גובה ומסלול מעוף שנבחרו',
  ) {
    super(message)
    this.name = 'CloudsFeasibilityOutOfTableError'
  }
}

export function isCloudsFeasibilityOutOfTableError(
  error: unknown,
): error is CloudsFeasibilityOutOfTableError {
  return error instanceof CloudsFeasibilityOutOfTableError
}

export class ObstaclesFeasibilityOutOfTableError extends Error {
  constructor(
    message = 'אין נתון בטבלת מכשולים לשילוב טווח, הפרש גובה, מרחק מכשול ומסלול מעוף שנבחרו',
  ) {
    super(message)
    this.name = 'ObstaclesFeasibilityOutOfTableError'
  }
}

export function isObstaclesFeasibilityOutOfTableError(
  error: unknown,
): error is ObstaclesFeasibilityOutOfTableError {
  return error instanceof ObstaclesFeasibilityOutOfTableError
}
