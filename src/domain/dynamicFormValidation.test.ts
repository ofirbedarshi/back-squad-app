import assert from 'node:assert/strict'
import { describe, it } from 'node:test'
import type { FormSchema } from './dynamicForm.types.ts'
import {
  isFilledFormValue,
  isFieldVisible,
  shouldValidateField,
  validateFormValues,
  buildParentByKeyMap,
  REQUIRED_FIELD_MESSAGE,
} from './dynamicFormValidation.ts'

const testSchema: FormSchema = {
  fields: [
    { type: 'text', key: 'optionalText', label: 'אופציונלי', required: false },
    { type: 'text', key: 'requiredText', label: 'חובה', required: true },
    {
      type: 'toggleWithConditions',
      key: 'parentToggle',
      label: 'הורה',
      options: ['כן', 'לא'],
      required: true,
      conditions: {
        כן: [{ type: 'text', key: 'conditionalText', label: 'מותנה', required: true }],
      },
    },
    { type: 'toggle', key: 'requiredToggle', label: 'בחירה', options: ['א', 'ב'], required: true },
  ],
}

describe('isFilledFormValue', () => {
  it('text empty fails', () => {
    assert.equal(isFilledFormValue('', 'text'), false)
    assert.equal(isFilledFormValue('  ', 'text'), false)
    assert.equal(isFilledFormValue('x', 'text'), true)
  })

  it('toggle empty fails', () => {
    assert.equal(isFilledFormValue('', 'toggle', ['א', 'ב']), false)
    assert.equal(isFilledFormValue('א', 'toggle', ['א', 'ב']), true)
  })

  it('number NaN fails', () => {
    assert.equal(isFilledFormValue(Number.NaN, 'number'), false)
    assert.equal(isFilledFormValue(3, 'number'), true)
  })

  it('multiSelectToggle empty fails, selection passes', () => {
    const options = ['מעוף', 'רעש'] as const
    assert.equal(isFilledFormValue([], 'multiSelectToggle', options), false)
    assert.equal(isFilledFormValue(['רעש'], 'multiSelectToggle', options), true)
    assert.equal(isFilledFormValue(['invalid'], 'multiSelectToggle', options), false)
  })
})

describe('conditional visibility', () => {
  const parentByKey = buildParentByKeyMap(testSchema)

  it('conditional field hidden when parent not כן', () => {
    const values = { parentToggle: 'לא' }
    const conditional = { type: 'text' as const, key: 'conditionalText', label: 'מותנה', required: true }
    assert.equal(isFieldVisible(conditional, values, parentByKey), false)
    assert.equal(shouldValidateField(conditional, values, parentByKey), false)
  })

  it('conditional field visible when parent is כן', () => {
    const values = { parentToggle: 'כן' }
    const conditional = { type: 'text' as const, key: 'conditionalText', label: 'מותנה', required: true }
    assert.equal(isFieldVisible(conditional, values, parentByKey), true)
    assert.equal(shouldValidateField(conditional, values, parentByKey), true)
  })
})

describe('validateFormValues', () => {
  it('optional empty passes, required empty fails', () => {
    const errors = validateFormValues(testSchema, {})
    assert.equal(errors.optionalText, undefined)
    assert.equal(errors.requiredText, REQUIRED_FIELD_MESSAGE)
    assert.equal(errors.requiredToggle, REQUIRED_FIELD_MESSAGE)
  })

  it('filled required passes', () => {
    const errors = validateFormValues(testSchema, {
      requiredText: 'ok',
      parentToggle: 'לא',
      requiredToggle: 'א',
    })
    assert.deepEqual(errors, {})
  })
})

const azimuthSchema: FormSchema = {
  fields: [
    { type: 'text', key: 'requiredAz', label: 'חובה', required: true, valueKind: 'azimuthDegree' },
    { type: 'text', key: 'optionalAz', label: 'אופציונלי', required: false, valueKind: 'azimuthDegree' },
  ],
}

describe('azimuth degree validation', () => {
  it('rejects out-of-range required azimuth on save', () => {
    const errors = validateFormValues(azimuthSchema, {
      requiredAz: '400',
      optionalAz: '',
    })
    assert.equal(errors.requiredAz, 'ערך מקסימלי הוא 359.9')
  })

  it('rejects invalid optional azimuth when filled', () => {
    const errors = validateFormValues(azimuthSchema, {
      requiredAz: '90',
      optionalAz: 'abc',
    })
    assert.equal(errors.optionalAz, 'יש להזין מספר')
  })
})
