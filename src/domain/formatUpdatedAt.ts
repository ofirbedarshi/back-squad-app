const UPDATED_AT_FORMAT = new Intl.DateTimeFormat('he-IL', {
  dateStyle: 'short',
  timeStyle: 'short',
  timeZone: 'Asia/Jerusalem',
})

export function formatUpdatedAt(isoUtc: string): string {
  const date = new Date(isoUtc)
  if (Number.isNaN(date.getTime())) {
    return '—'
  }
  return UPDATED_AT_FORMAT.format(date)
}
