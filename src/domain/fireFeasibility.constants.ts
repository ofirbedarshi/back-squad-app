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

export const FLIGHT_PATH_OPTIONS = [
  { label: 'flat', value: 'flat' },
  { label: 'low', value: 'low' },
  { label: 'lofted', value: 'lofted' },
  { label: 'lofted +', value: '+lofted' },
] as const

export const POSITION_FIELD_TOOLTIP =
  'שדה זה מתמלא אוטומטית מהעמדה שנבחרה בשלב הקודם ואינו ניתן לעריכה ידנית'

export const TARGET_FIELD_TOOLTIP =
  'שדה זה מתמלא אוטומטית מהמטרה שנבחרה בשלב הקודם ואינו ניתן לעריכה ידנית'

export const CLOUD_HEIGHT_FIELD_TOOLTIP =
  'שדה זה מתמלא אוטומטית מגובה בסיס הענן שנשמר במסך הבית ואינו ניתן לעריכה ידנית'

export const RANGE_COMPUTED_TOOLTIP =
  'ערך מחושב אוטומטית כטווח בין העמדה למטרה לפי נ"צ וגובה כששניהם נטענו. לא ניתן לעריכה ידנית.'
