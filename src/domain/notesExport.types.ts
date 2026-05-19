export const NOTES_EXPORT_COLUMN_CREATED = 'תאריך יצירה'
export const NOTES_EXPORT_COLUMN_UPDATED = 'תאריך עדכון'
export const NOTES_EXPORT_COLUMN_TEXT = 'טקסט'

export const NOTES_EXPORT_HEADERS = [
  NOTES_EXPORT_COLUMN_CREATED,
  NOTES_EXPORT_COLUMN_UPDATED,
  NOTES_EXPORT_COLUMN_TEXT,
] as const

export interface NotesExportRow {
  createdAtLabel: string
  updatedAtLabel: string
  text: string
}
