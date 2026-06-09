export function elevationAngleDegFromHorizontalDistanceAndHeightDifference(
  horizontalDistanceMeters: number,
  heightDifferenceMeters: number,
): number {
  if (!Number.isFinite(horizontalDistanceMeters) || horizontalDistanceMeters <= 0) {
    throw new Error('מרחק אופקי לא תקין')
  }
  if (!Number.isFinite(heightDifferenceMeters)) {
    throw new Error('הפרש גובה לא תקין')
  }

  const radians = Math.atan(heightDifferenceMeters / horizontalDistanceMeters)
  return (radians * 180) / Math.PI
}
