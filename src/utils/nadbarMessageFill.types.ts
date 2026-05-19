import type { Indicator } from '../domain/indicator.types'
import type { Position } from '../domain/position.types'
import type { Target } from '../domain/target.types'

export interface NadbarMessageResources {
  indicator?: Indicator
  target?: Target
  position?: Position
}

export type NadbarMessageResourceKey = keyof NadbarMessageResources

export const NADBAR_RESOURCE_LOAD_PROMPTS: Record<NadbarMessageResourceKey, string> = {
  indicator: 'נא לטעון מציין',
  target: 'נא לטעון מטרה',
  position: 'נא לטעון עמדה',
}

export type NadbarMessageTextSegment = { type: 'text'; text: string }
export type NadbarMessageResourceSegment = { type: 'resource'; tokenKey: string }
export type NadbarMessageUserVarSegment = { type: 'userVar'; varName: string }

export type NadbarMessageSegment =
  | NadbarMessageTextSegment
  | NadbarMessageResourceSegment
  | NadbarMessageUserVarSegment

export type NadbarResourceSegmentFill =
  | { type: 'value'; value: string }
  | { type: 'missing'; prompt: string }
  | { type: 'unknown' }
