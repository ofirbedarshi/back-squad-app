import type {
  CheckboxWithFieldsBorderHighlightRule,
  FormValues,
} from './dynamicForm.types'

function ruleMatches(rule: CheckboxWithFieldsBorderHighlightRule, values: FormValues): boolean {
  const value = values[rule.field]

  if ('equals' in rule) {
    return value === rule.equals
  }

  const numeric =
    typeof value === 'number' ? value : typeof value === 'string' ? Number(value) : NaN
  return Number.isFinite(numeric) && numeric > rule.greaterThan
}

export function collectHighlightBorderWatchKeys(
  when?: CheckboxWithFieldsBorderHighlightRule[],
  whenAll?: CheckboxWithFieldsBorderHighlightRule[],
): string[] {
  const keys = [...(when ?? []), ...(whenAll ?? [])].map((rule) => rule.field)
  return [...new Set(keys)]
}

export function shouldHighlightCheckboxWithFieldsBorder(
  values: FormValues,
  when?: CheckboxWithFieldsBorderHighlightRule[],
  whenAll?: CheckboxWithFieldsBorderHighlightRule[],
): boolean {
  const anyMatch = when?.some((rule) => ruleMatches(rule, values)) ?? false
  const allMatch = whenAll?.length ? whenAll.every((rule) => ruleMatches(rule, values)) : false
  return anyMatch || allMatch
}
