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

export const CONCEALMENT_ELEVATION_ANGLE_THRESHOLD_DEG = 10

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
