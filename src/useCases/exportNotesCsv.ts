import {
  buildNotesExportFilename,
  buildNotesExportRows,
  notesExportRowsToCsv,
} from '../domain/notesExport'
import { saveTextFileToDevice } from '../platform/saveTextFileToDevice'
import { loadNotesUseCase } from './loadNotes'

export function exportNotesCsvUseCase(): string {
  const notes = loadNotesUseCase()
  if (notes.length === 0) {
    throw new Error('אין הערות לייצוא')
  }
  const exportedAtIso = new Date().toISOString()
  const fileName = buildNotesExportFilename(exportedAtIso)
  const rows = buildNotesExportRows(notes)
  const csv = notesExportRowsToCsv(rows)
  return saveTextFileToDevice(fileName, csv)
}
