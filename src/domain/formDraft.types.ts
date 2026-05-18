/** JSON-serializable snapshot of arbitrary form field values. */
export type FormDraftValues = Record<string, unknown>

export const FORM_DRAFT_DEBOUNCE_MS = 400

export const FORM_DRAFT_KEYS = {
  BACH_CREATE: 'bach-create',
  bachEdit: (id: string) => `bach-edit:${id}`,
  MISS_CHECKLIST_CREATE: 'miss-checklist-create',
  missChecklistEdit: (id: string) => `miss-checklist-edit:${id}`,
  CURRENT_POSITION: 'current-position',
  TARGET_CREATE: 'target-create',
  targetEdit: (id: string) => `target-edit:${id}`,
  ATTACK_LOG_CREATE: 'attack-log-create',
  attackLogEdit: (id: string) => `attack-log-edit:${id}`,
  INDICATOR_CREATE: 'indicator-create',
  indicatorEdit: (id: string) => `indicator-edit:${id}`,
  POSITION_CREATE: 'position-create',
  positionEdit: (id: string) => `position-edit:${id}`,
  positionPromote: (id: string) => `position-promote:${id}`,
  CLOUD_HEIGHT: 'cloud-height',
  NOTE_CREATE: 'note-create',
  noteEdit: (id: string) => `note-edit:${id}`,
} as const
