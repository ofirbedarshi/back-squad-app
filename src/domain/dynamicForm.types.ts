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
  defaultValue?: string
}

export interface DateField {
  type: 'date'
  key: string
  label: string
  defaultValue?: string
}

export interface TimeField {
  type: 'time'
  key: string
  label: string
  defaultValue?: string
}

export interface ToggleField {
  type: 'toggle'
  key: string
  label: string
  options: [string, string, ...string[]]
  defaultValue?: string
}

export interface CheckboxField {
  type: 'checkbox'
  key: string
  label: string
  defaultValue?: boolean
}

export interface CoordsField {
  type: 'coords'
  key: string
  label: string
  defaultValue?: CoordinateValue
}

export interface NoteField {
  type: 'note'
  text: string
}

export type RowableField = TextField | DateField | TimeField | ToggleField | CheckboxField | CoordsField

export interface RowField {
  type: 'row'
  fields: RowableField[]
}

export type FormFieldDef = HeaderField | NoteField | RowField | TextField | DateField | TimeField | ToggleField | CheckboxField | CoordsField

export interface FormSchema {
  fields: FormFieldDef[]
}

export type FormValues = Record<string, string | boolean | CoordinateValue>
