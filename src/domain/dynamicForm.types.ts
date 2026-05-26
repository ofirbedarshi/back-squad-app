export type { CoordinateValue } from '../components/base/coordinateInput.types'
import type { CoordinateValue } from '../components/base/coordinateInput.types'
import type { FormFieldVisibleWhen } from './dynamicFormVisibleWhen'

/** Form keys watched for computed position→target metrics. Omitted entries use Bach (עמדה אחורית) defaults. */
export type PositionToTargetWatchKeyOverrides = Partial<{
  targetId: string
  positionId: string
  positionCoords: string
  positionAltitude: string
  targetCoords: string
  targetAltitude: string
}>

export interface HeaderField {
  type: 'header'
  text: string
  bold?: boolean
}

export interface TextField {
  type: 'text'
  key: string
  label: string
  placeholder?: string
  required?: boolean
  defaultValue?: string
  /** Key of another field whose truthy value disables this field. */
  lockedByRef?: string
  infoTooltipText?: string
  /** Auto-calculated from loaded entities; empty when source or target is missing. */
  computedFrom?: 'indicatorToTarget' | 'positionToTarget'
  computedMetric?: 'azimuth' | 'range' | 'altitudeDiff'
  /** When `computedFrom` is positionToTarget: which form keys hold position/target (defaults: בדח rear position + מטרה). */
  positionToTargetWatchKeys?: PositionToTargetWatchKeyOverrides
  /** Manual azimuth in degrees (0–359.9); non-empty optional values must be numeric. */
  valueKind?: 'azimuthDegree'
}

export interface TextareaField {
  type: 'textarea'
  key: string
  label: string
  placeholder?: string
  required?: boolean
  defaultValue?: string
  rows?: number
  infoTooltipText?: string
  lockedByRef?: string
}

export interface DateField {
  type: 'date'
  key: string
  label: string
  required?: boolean
  defaultValue?: string
}

export interface TimeField {
  type: 'time'
  key: string
  label: string
  required?: boolean
  defaultValue?: string
}

export interface ToggleField {
  type: 'toggle'
  key: string
  label: string
  options: [string, string, ...string[]]
  required?: boolean
  defaultValue?: string
  visibleWhen?: FormFieldVisibleWhen
}

export interface CheckboxField {
  type: 'checkbox'
  key: string
  label: string
  required?: boolean
  defaultValue?: boolean
  visibleWhen?: FormFieldVisibleWhen
}

/** When any rule matches form values, the outer card border turns red. */
export type CheckboxWithFieldsBorderHighlightRule =
  | { field: string; equals: string }
  | { field: string; greaterThan: number }

/** Checkbox with nested fields; checkbox auto-checks when all nested fields are filled. */
export interface CheckboxWithFieldsField {
  type: 'checkboxWithFields'
  key: string
  label: string
  required?: boolean
  defaultValue?: boolean
  visibleWhen?: FormFieldVisibleWhen
  /** When any rule matches form values, the outer card border turns red. */
  highlightBorderWhen?: CheckboxWithFieldsBorderHighlightRule[]
  fields: RowableField[]
}

export interface MultiSelectToggleField {
  type: 'multiSelectToggle'
  key: string
  label: string
  options: [string, string, ...string[]]
  required?: boolean
  defaultValue?: string[]
}

export interface NumberField {
  type: 'number'
  key: string
  label: string
  placeholder?: string
  required?: boolean
  defaultValue?: number
  infoTooltipText?: string
}

export interface CoordsField {
  type: 'coords'
  key: string
  label: string
  required?: boolean
  defaultValue?: CoordinateValue
  /** Key of another field whose truthy value disables this field. */
  lockedByRef?: string
  infoTooltipText?: string
}

export interface NoteField {
  type: 'note'
  text: string
  visibleWhen?: FormFieldVisibleWhen
}

/** A toggle that reveals different child fields depending on which option is selected. */
export interface ToggleWithConditionsField {
  type: 'toggleWithConditions'
  key: string
  label: string
  options: [string, string, ...string[]]
  required?: boolean
  defaultValue?: string
  visibleWhen?: FormFieldVisibleWhen
  /** Maps each option value to the fields shown when that option is active. */
  conditions: Partial<Record<string, FormFieldDef[]>>
}

export interface TargetLoaderField {
  type: 'targetLoader'
  /** Form key where the selected target's id is stored. */
  key: string
  text: string
  bold?: boolean
  required?: boolean
  /** Maps Target domain properties to form field keys. */
  fieldMappings: {
    targetName?: string
    targetCoords?: string
    targetAltitude?: string
    targetDescription?: string
  }
}

export type RowableField =
  | TextField
  | TextareaField
  | NumberField
  | DateField
  | TimeField
  | ToggleField
  | ToggleWithConditionsField
  | CheckboxField
  | CoordsField
  | NoteField

export interface RowField {
  type: 'row'
  fields: RowableField[]
}

export interface IndicatorLoaderField {
  type: 'indicatorLoader'
  /** Form key where the selected indicator's id is stored. */
  key: string
  text: string
  bold?: boolean
  required?: boolean
  /** Maps Indicator domain properties to form field keys. */
  fieldMappings: {
    indicatorName?: string
    coordinates?: string
    altitude?: string
    means?: string
    markCode?: string
  }
}

/** Picked from archive + current; auto-loads current position on mount when empty. */
export interface PositionLoaderField {
  type: 'positionLoader'
  key: string
  text: string
  bold?: boolean
  required?: boolean
  fieldMappings: {
    positionName?: string
    positionCoords?: string
    positionAltitude?: string
    aka?: string
  }
}

export type FormFieldDef =
  | HeaderField
  | NoteField
  | RowField
  | TextField
  | TextareaField
  | NumberField
  | DateField
  | TimeField
  | ToggleField
  | ToggleWithConditionsField
  | CheckboxField
  | CheckboxWithFieldsField
  | MultiSelectToggleField
  | CoordsField
  | TargetLoaderField
  | IndicatorLoaderField
  | PositionLoaderField

export interface FormSchema {
  fields: FormFieldDef[]
}

export type FormValues = Record<string, string | number | boolean | string[] | CoordinateValue>
