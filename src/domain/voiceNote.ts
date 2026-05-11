export function formatVoiceDurationSec(totalSec: number): string {
  const s = Math.max(0, Math.floor(totalSec))
  const m = Math.floor(s / 60)
  const r = s % 60
  return `${m}:${String(r).padStart(2, '0')}`
}

export function assertVoiceBlobReady(blob: Blob | null): Blob {
  if (!blob || blob.size === 0) {
    throw new Error('אין הקלטה לשמירה')
  }
  return blob
}
