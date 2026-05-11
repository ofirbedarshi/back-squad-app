const DB_NAME = 'backSquadVoiceNotes'
const DB_VERSION = 1
const STORE = 'voiceNotes'

/** Voice blob for a text note; `id` matches `UserNote.id`. */
export interface NoteVoiceBlobRow {
  id: string
  blob: Blob
  mimeType: string
}

function openDb(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const req = indexedDB.open(DB_NAME, DB_VERSION)
    req.onerror = () => reject(req.error ?? new Error('IndexedDB נכשל'))
    req.onsuccess = () => resolve(req.result)
    req.onupgradeneeded = () => {
      const db = req.result
      if (!db.objectStoreNames.contains(STORE)) {
        db.createObjectStore(STORE, { keyPath: 'id' })
      }
    }
  })
}

function promisifyRequest<T>(request: IDBRequest<T>): Promise<T> {
  return new Promise((resolve, reject) => {
    request.onerror = () => reject(request.error ?? new Error('בקשת IndexedDB נכשלה'))
    request.onsuccess = () => resolve(request.result)
  })
}

export async function idbSaveNoteVoice(row: NoteVoiceBlobRow): Promise<void> {
  const db = await openDb()
  try {
    const tx = db.transaction(STORE, 'readwrite')
    await promisifyRequest(tx.objectStore(STORE).put(row))
  } finally {
    db.close()
  }
}

export async function idbGetNoteVoice(id: string): Promise<NoteVoiceBlobRow | undefined> {
  const db = await openDb()
  try {
    const tx = db.transaction(STORE, 'readonly')
    return await promisifyRequest(tx.objectStore(STORE).get(id) as IDBRequest<NoteVoiceBlobRow | undefined>)
  } finally {
    db.close()
  }
}

export async function idbDeleteNoteVoice(id: string): Promise<void> {
  const db = await openDb()
  try {
    const tx = db.transaction(STORE, 'readwrite')
    await promisifyRequest(tx.objectStore(STORE).delete(id))
  } finally {
    db.close()
  }
}
