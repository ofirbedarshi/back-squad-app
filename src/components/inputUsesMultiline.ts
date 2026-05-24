const NATIVE_INPUT_TYPES = new Set([
  'number',
  'date',
  'time',
  'datetime-local',
  'month',
  'week',
  'color',
  'range',
  'checkbox',
  'radio',
  'file',
  'hidden',
])

export function inputUsesMultiline(multiline: boolean | undefined, type?: string): boolean {
  if (multiline === false) return false
  if (type && NATIVE_INPUT_TYPES.has(type)) return false
  return true
}
