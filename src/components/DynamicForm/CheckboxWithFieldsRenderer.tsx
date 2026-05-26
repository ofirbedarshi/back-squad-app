import { Controller } from 'react-hook-form'
import CheckboxWithFields from '../base/CheckboxWithFields'
import {
  collectHighlightBorderWatchKeys,
  shouldHighlightCheckboxWithFieldsBorder,
} from '../../domain/dynamicFormHighlight'
import {
  areAllRowableFieldsFilled,
  makeFieldValidator,
} from '../../domain/dynamicFormValidation'
import type { CheckboxWithFieldsRendererProps } from './CheckboxWithFieldsRenderer.types'

function getNestedFieldKeys(fields: CheckboxWithFieldsRendererProps['field']['fields']): string[] {
  return fields.filter((child): child is typeof child & { key: string } => 'key' in child).map(
    (child) => child.key,
  )
}

export default function CheckboxWithFieldsRenderer({
  field,
  control,
  getValues,
  watch,
  parentByKey,
  renderNestedField,
}: CheckboxWithFieldsRendererProps) {
  const nestedKeys = getNestedFieldKeys(field.fields)
  const highlightWatchKeys = collectHighlightBorderWatchKeys(
    field.highlightBorderWhen,
    field.highlightBorderWhenAll,
  )
  watch([...nestedKeys, ...highlightWatchKeys])

  let allInputsFilled = false
  try {
    allInputsFilled = areAllRowableFieldsFilled(getValues(), field.fields)
    if (field.key === 'impactLocationDetectedChecked') {
      // #region agent log
      fetch('http://127.0.0.1:7426/ingest/4a83feaa-631d-41d5-8558-e70907ee82ba',{method:'POST',headers:{'Content-Type':'application/json','X-Debug-Session-Id':'16f59f'},body:JSON.stringify({sessionId:'16f59f',location:'CheckboxWithFieldsRenderer.tsx:autoCheck',message:'areAllRowableFieldsFilled ok',data:{fieldKey:field.key,allInputsFilled},timestamp:Date.now(),hypothesisId:'H-A',runId:'post-fix'})}).catch(()=>{});
      // #endregion
    }
  } catch (err) {
    const autoCheckError = err instanceof Error ? err.message : String(err)
    // #region agent log
    fetch('http://127.0.0.1:7426/ingest/4a83feaa-631d-41d5-8558-e70907ee82ba',{method:'POST',headers:{'Content-Type':'application/json','X-Debug-Session-Id':'16f59f'},body:JSON.stringify({sessionId:'16f59f',location:'CheckboxWithFieldsRenderer.tsx:autoCheck',message:'areAllRowableFieldsFilled threw',data:{fieldKey:field.key,error:autoCheckError},timestamp:Date.now(),hypothesisId:'H-A'})}).catch(()=>{});
    // #endregion
    throw err
  }

  const highlightBorder = shouldHighlightCheckboxWithFieldsBorder(
    getValues(),
    field.highlightBorderWhen,
    field.highlightBorderWhenAll,
  )

  return (
    <Controller
      name={field.key}
      control={control}
      defaultValue={field.defaultValue ?? false}
      rules={{ validate: makeFieldValidator(field, getValues, parentByKey) }}
      render={({ field: formField }) => (
        <CheckboxWithFields
          label={field.label}
          checked={formField.value === true}
          onChange={formField.onChange}
          allInputsFilled={allInputsFilled}
          highlightBorder={highlightBorder}
        >
          {field.fields.map((child, index) => renderNestedField(child, index))}
        </CheckboxWithFields>
      )}
    />
  )
}
