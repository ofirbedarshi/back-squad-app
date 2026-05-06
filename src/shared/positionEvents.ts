import EventEmitter from 'eventemitter3'

export const POSITION_EVENTS = {
  CURRENT_CHANGED: 'current-changed',
} as const

export const positionEvents = new EventEmitter()
