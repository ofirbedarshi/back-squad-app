import type { FireFeasibilityGeneration } from './fireFeasibility.types'

export const FIRE_FEASIBILITY_GENERATION_LABELS: Record<FireFeasibilityGeneration, string> = {
  a: 'דור א׳',
  b: 'דור ב׳',
}

export const FIRE_FEASIBILITY_CATEGORY_TITLES = {
  clouds: 'עננים',
  obstacles: 'מכשולים',
  concealment: 'הסתרים',
} as const

export const FIRE_FEASIBILITY_NOT_IMPLEMENTED_NOTE = 'טרם מומש'

export const OBSTACLES_FEASIBILITY_MISSING_INPUT_NOTE =
  'לא הוזנו נתוני מכשול — הקטגוריה לא נבדקה ומסומנת כמאפשרת'

export const OBSTACLES_FLAT_FLIGHT_PATH_NOTE = 'מסלול flat אינו נתמך בטבלת מכשולים'

export const OBSTACLES_OUT_OF_TABLE_NOTE = 'ערכי מכשול מחוץ לטבלת הערכים'

export const CONCEALMENT_FEASIBILITY_MISSING_INPUT_NOTE =
  'לא הוזנו נתוני הסתר — הקטגוריה לא נבדקה ומסומנת כמאפשרת'

export const CONCEALMENT_FLAT_FLIGHT_PATH_NOTE = 'מסלול flat אינו נתמך בבדיקת הסתרים — לא מאפשר'

export const CONCEALMENT_RANGE_TOO_SHORT_NOTE = 'טווח עמדה-מטרה קצר מ-3 ק"מ — לא מאפשר'

export const CONCEALMENT_OUT_OF_TABLE_NOTE = 'ערכי קלט מחוץ לטבלת הערכים — מסומן כמאפשר'

export const CONCEALMENT_RANGE_BANDS = [
  { minMeters: 3000, maxMeters: 6000, rangeFromTargetMeters: 2500 },
  { minMeters: 6000, maxMeters: 8000, rangeFromTargetMeters: 3000 },
  { minMeters: 8000, maxMeters: Infinity, rangeFromTargetMeters: 4000 },
] as const

export const FLIGHT_PATH_OPTIONS = [
  { label: 'flat', value: 'flat' },
  { label: 'low', value: 'low' },
  { label: 'lofted', value: 'lofted' },
  { label: 'lofted +', value: '+lofted' },
] as const

export const FIRE_FEASIBILITY_FLIGHT_PATH_RESULT_ROWS = [
  { label: '+L', value: '+lofted' },
  { label: 'L', value: 'lofted' },
  { label: 'Low', value: 'low' },
  { label: 'F', value: 'flat' },
] as const

export type FireFeasibilityFlightPathResultRow =
  (typeof FIRE_FEASIBILITY_FLIGHT_PATH_RESULT_ROWS)[number]

export const POSITION_FIELD_TOOLTIP =
  'שדה זה מתמלא אוטומטית מהעמדה שנבחרה בשלב הקודם ואינו ניתן לעריכה ידנית'

export const TARGET_FIELD_TOOLTIP =
  'שדה זה מתמלא אוטומטית מהמטרה שנבחרה בשלב הקודם ואינו ניתן לעריכה ידנית'

export const CLOUD_HEIGHT_FIELD_TOOLTIP =
  'שדה זה מתמלא אוטומטית מגובה בסיס הענן שנשמר במסך הבית ואינו ניתן לעריכה ידנית'

export const RANGE_COMPUTED_TOOLTIP =
  'ערך מחושב אוטומטית כטווח בין העמדה למטרה לפי נ"צ וגובה כששניהם נטענו. לא ניתן לעריכה ידנית.'

export const OBSTACLE_HEIGHT_REFERENCE_TOGGLE_OPTIONS = [
  { label: 'מעל פני הים', value: 'amsl' },
  { label: 'מעל העמדה', value: 'abovePosition' },
] as const

export const OBSTACLE_HEIGHT_FIELD_LABEL_BY_REFERENCE = {
  amsl: 'גובה מכשול (מעל פני הים)',
  abovePosition: 'גובה מכשול (מעל העמדה)',
} as const
