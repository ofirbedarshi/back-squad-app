import { formatUserNoteSavedAt, noteLastActivityIso } from './notes'
import type { UserNote } from './notes.types'
import {
  NOTES_EXPORT_HEADERS,
  type NotesExportRow,
} from './notesExport.types'

const EXPORT_FILENAME_FORMAT = new Intl.DateTimeFormat('en-CA', {
  timeZone: 'Asia/Jerusalem',
  year: 'numeric',
  month: '2-digit',
  day: '2-digit',
  hour: '2-digit',
  minute: '2-digit',
  hour12: false,
})

const CSV_BOM = '\uFEFF'

export function buildNotesExportRows(notes: readonly UserNote[]): NotesExportRow[] {
  const sorted = [...notes].sort(
    (a, b) =>
      new Date(noteLastActivityIso(b)).getTime() - new Date(noteLastActivityIso(a)).getTime(),
  )
  return sorted.map((note) => ({
    createdAtLabel: formatUserNoteSavedAt(note.createdAtIso),
    updatedAtLabel:
      note.updatedAtIso !== undefined ? formatUserNoteSavedAt(note.updatedAtIso) : '',
    text: note.text,
  }))
}

export function escapeCsvCell(value: string): string {
  if (!/[",\r\n]/.test(value)) {
    return value
  }
  return `"${value.replace(/"/g, '""')}"`
}

export function notesExportRowsToCsv(rows: readonly NotesExportRow[]): string {
  const lines = [
    NOTES_EXPORT_HEADERS.map(escapeCsvCell).join(','),
    ...rows.map((row) =>
      [row.createdAtLabel, row.updatedAtLabel, row.text].map(escapeCsvCell).join(','),
    ),
  ]
  return `${CSV_BOM}${lines.join('\r\n')}\r\n`
}

export function buildNotesExportFilename(exportedAtIso: string): string {
  const d = new Date(exportedAtIso)
  if (Number.isNaN(d.getTime())) {
    throw new Error('תאריך ייצוא לא תקין')
  }
  const parts = EXPORT_FILENAME_FORMAT.formatToParts(d)
  const get = (type: Intl.DateTimeFormatPartTypes) =>
    parts.find((p) => p.type === type)?.value ?? '00'
  const date = `${get('year')}-${get('month')}-${get('day')}`
  const time = `${get('hour')}-${get('minute')}`
  return `notes-export-${date}_${time}.csv`
}
