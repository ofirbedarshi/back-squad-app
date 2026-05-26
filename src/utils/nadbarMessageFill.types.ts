import type { EntityLinkResources } from '../domain/entityLinks.types'

export type NadbarMessageResources = EntityLinkResources

export type NadbarMessageResourceKey = keyof NadbarMessageResources

export const NADBAR_RESOURCE_LOAD_PROMPTS: Record<NadbarMessageResourceKey, string> = {
  indicator: 'נא לטעון מציין',
  target: 'נא לטעון מטרה',
  position: 'נא לטעון עמדה',
}

export type NadbarMessageTextSegment = { type: 'text'; text: string }
export type NadbarMessageResourceSegment = { type: 'resource'; tokenKey: string }
export type NadbarMessageUserVarSegment = { type: 'userVar'; varName: string }
export type NadbarMessageUserVarFallbackSegment = {
  type: 'userVarFallback'
  primary: string
  fallback: string
}

export type NadbarMessageSegment =
  | NadbarMessageTextSegment
  | NadbarMessageResourceSegment
  | NadbarMessageUserVarSegment
  | NadbarMessageUserVarFallbackSegment

export type NadbarUserVarFallbackDisplay = {
  value: string
  activeVar: string
}

export type NadbarResourceSegmentFill =
  | { type: 'value'; value: string }
  | { type: 'missing'; prompt: string }
  | { type: 'unknown' }
