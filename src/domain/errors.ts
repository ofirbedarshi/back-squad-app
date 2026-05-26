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
