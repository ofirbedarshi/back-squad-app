import { z } from 'zod'
import { pitchRollSchema } from './pitchRollInput.utils'
import { coordinateValueSchema } from './base/coordinateInput.utils'
import type { PositionFormInitialShape } from '../domain/position.types'

const numberField = z.number({ error: 'יש להזין מספר' })

const optionalDegreeField = z.number().min(0).max(359.9, 'ערך מקסימלי הוא 359.9').optional()

const requiredDegreeField = z
  .number({ error: 'יש להזין מספר' })
  .min(0, 'ערך מינימלי הוא 0')
  .max(359.9, 'ערך מקסימלי הוא 359.9')

const boundarySchema = z.object({
  compass: requiredDegreeField,
  target: requiredDegreeField,
})

const sectorSchema = z.object({
  left: boundarySchema,
  right: boundarySchema,
})

const plusTenAppliedSchema = z.object({
  primarySectorLeftTarget: z.boolean(),
  secondarySectorLeftTarget: z.boolean(),
})

const obstacleSchema = z.object({
  compass: optionalDegreeField,
  target: optionalDegreeField,
})

export const LAUNCHER_TYPES = {
  VEHICLE: 'vehicle',
  INFANTRY: 'infantry',
} as const

export const schema = z
  .object({
    stationName: z.string().min(1, 'שדה חובה'),
    coordinates: coordinateValueSchema,
    altitude: numberField,
    aka: numberField.max(359.9, 'ערך מקסימלי הוא 359.9'),
    launcherType: z.enum(['vehicle', 'infantry']),
    vehicleId: z.string().optional(),
    pitch: pitchRollSchema,
    roll: pitchRollSchema,
    primarySector: sectorSchema,
    secondarySector: sectorSchema,
    plusTenApplied: plusTenAppliedSchema,
    obstacles: z.array(obstacleSchema).optional(),
  })
  .superRefine((data, ctx) => {
    if (!data.plusTenApplied.primarySectorLeftTarget) {
      ctx.addIssue({
        code: 'custom',
        path: ['primarySector', 'left', 'target'],
        message: 'יש ללחוץ על +10 לפני השמירה',
      })
    }

    if (!data.plusTenApplied.secondarySectorLeftTarget) {
      ctx.addIssue({
        code: 'custom',
        path: ['secondarySector', 'left', 'target'],
        message: 'יש ללחוץ על +10 לפני השמירה',
      })
    }
  })

export type PositionFormValues = z.infer<typeof schema>

export const LAUNCHER_OPTIONS: [{ label: string; value: string }, { label: string; value: string }] = [
  { label: 'משגר רכב', value: LAUNCHER_TYPES.VEHICLE },
  { label: 'משגר רגלי', value: LAUNCHER_TYPES.INFANTRY },
]

export const EMPTY_OBSTACLES = [
  { compass: undefined, target: undefined },
  { compass: undefined, target: undefined },
  { compass: undefined, target: undefined },
]

export function getInitialPlusTenApplied(initialValues?: PositionFormInitialShape) {
  return {
    primarySectorLeftTarget: typeof initialValues?.primarySector?.left?.target === 'number',
    secondarySectorLeftTarget: typeof initialValues?.secondarySector?.left?.target === 'number',
  }
}

export function parseDegreeInput(v: string): number | undefined {
  if (v === '' || v === null || v === undefined) return undefined
  const n = parseFloat(v)
  return isNaN(n) ? undefined : n
}

export const degreeOpts = { setValueAs: parseDegreeInput }
