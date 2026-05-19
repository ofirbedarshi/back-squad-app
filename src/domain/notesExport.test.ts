import { describe, expect, it } from 'vitest'
import {
  buildNotesExportFilename,
  buildNotesExportRows,
  escapeCsvCell,
  notesExportRowsToCsv,
} from './notesExport'
import { NOTES_EXPORT_HEADERS } from './notesExport.types'
import type { UserNote } from './notes.types'

describe('notesExport', () => {
  it('escapeCsvCell leaves plain text unchanged', () => {
    expect(escapeCsvCell('שלום')).toBe('שלום')
  })

  it('escapeCsvCell quotes cells with comma, quote, or newline', () => {
    expect(escapeCsvCell('a,b')).toBe('"a,b"')
    expect(escapeCsvCell('say "hi"')).toBe('"say ""hi"""')
    expect(escapeCsvCell('line1\nline2')).toBe('"line1\nline2"')
  })

  it('buildNotesExportRows sorts by last activity descending', () => {
    const notes: UserNote[] = [
      { id: '1', text: 'old', createdAtIso: '2020-01-01T10:00:00.000Z' },
      {
        id: '2',
        text: 'newer',
        createdAtIso: '2020-01-01T08:00:00.000Z',
        updatedAtIso: '2020-06-01T12:00:00.000Z',
      },
    ]
    const rows = buildNotesExportRows(notes)
    expect(rows[0]?.text).toBe('newer')
    expect(rows[1]?.text).toBe('old')
  })

  it('buildNotesExportRows includes empty text for voice-only notes', () => {
    const notes: UserNote[] = [
      {
        id: '1',
        text: '',
        createdAtIso: '2020-01-01T10:00:00.000Z',
        hasVoice: true,
        durationSec: 5,
      },
    ]
    expect(buildNotesExportRows(notes)[0]?.text).toBe('')
  })

  it('notesExportRowsToCsv includes BOM and Hebrew headers', () => {
    const csv = notesExportRowsToCsv([])
    expect(csv.startsWith('\uFEFF')).toBe(true)
    expect(csv).toContain(NOTES_EXPORT_HEADERS.join(','))
  })

  it('notesExportRowsToCsv escapes Hebrew text with commas', () => {
    const csv = notesExportRowsToCsv([
      { createdAtLabel: '1.1.20', updatedAtLabel: '', text: 'טקסט, עם פסיק' },
    ])
    expect(csv).toContain('"טקסט, עם פסיק"')
  })

  it('buildNotesExportFilename uses Jerusalem local parts', () => {
    expect(buildNotesExportFilename('2024-03-15T10:30:00.000Z')).toMatch(
      /^notes-export-\d{4}-\d{2}-\d{2}_\d{2}-\d{2}\.csv$/,
    )
  })

  it('buildNotesExportFilename throws on invalid date', () => {
    expect(() => buildNotesExportFilename('not-a-date')).toThrow('תאריך ייצוא לא תקין')
  })
})
