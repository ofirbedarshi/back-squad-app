export type { CoordinateValue } from '../components/base/coordinateInput.types'
import type { CoordinateValue } from '../components/base/coordinateInput.types'

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
  computedMetric?: 'azimuth' | 'range'
  /** Manual azimuth in degrees (0–359.9); non-empty optional values must be numeric. */
  valueKind?: 'azimuthDegree'
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
}

export interface CheckboxField {
  type: 'checkbox'
  key: string
  label: string
  required?: boolean
  defaultValue?: boolean
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
}

/** A toggle that reveals different child fields depending on which option is selected. */
export interface ToggleWithConditionsField {
  type: 'toggleWithConditions'
  key: string
  label: string
  options: [string, string, ...string[]]
  required?: boolean
  defaultValue?: string
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

/** Like targetLoader, but fills mapped fields from current position on mount (no load button). */
export interface CurrentPositionLoaderField {
  type: 'currentPositionLoader'
  /** Form key where the captured position id is stored. */
  key: string
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
  | NumberField
  | DateField
  | TimeField
  | ToggleField
  | ToggleWithConditionsField
  | CheckboxField
  | CoordsField
  | TargetLoaderField
  | IndicatorLoaderField
  | CurrentPositionLoaderField

export interface FormSchema {
  fields: FormFieldDef[]
}

export type FormValues = Record<string, string | number | boolean | CoordinateValue>
