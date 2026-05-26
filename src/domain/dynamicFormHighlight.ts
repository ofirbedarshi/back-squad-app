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

export function shouldHighlightCheckboxWithFieldsBorder(
  rules: CheckboxWithFieldsBorderHighlightRule[] | undefined,
  values: FormValues,
): boolean {
  if (!rules?.length) return false
  return rules.some((rule) => ruleMatches(rule, values))
}
