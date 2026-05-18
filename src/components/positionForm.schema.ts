import { z } from 'zod'
import { pitchRollSchema } from './pitchRollInput.utils'
import { coordinateValueSchema } from './base/coordinateInput.utils'
import type { PositionFormInitialShape } from '../domain/position.types'
import {
  AZIMUTH_DEGREE_MAX,
  AZIMUTH_DEGREE_MIN,
  AZIMUTH_MAX_MESSAGE,
  AZIMUTH_MIN_MESSAGE,
  AZIMUTH_MUST_BE_NUMBER_MESSAGE,
} from '../domain/azimuthDegree'

const numberField = z.number({ error: AZIMUTH_MUST_BE_NUMBER_MESSAGE })

const optionalDegreeField = z
  .number({ error: AZIMUTH_MUST_BE_NUMBER_MESSAGE })
  .min(AZIMUTH_DEGREE_MIN, AZIMUTH_MIN_MESSAGE)
  .max(AZIMUTH_DEGREE_MAX, AZIMUTH_MAX_MESSAGE)
  .optional()

const requiredDegreeField = z
  .number({ error: AZIMUTH_MUST_BE_NUMBER_MESSAGE })
  .min(AZIMUTH_DEGREE_MIN, AZIMUTH_MIN_MESSAGE)
  .max(AZIMUTH_DEGREE_MAX, AZIMUTH_MAX_MESSAGE)

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

const sharedPositionFields = {
  stationName: z.string().min(1, 'שדה חובה'),
  coordinates: coordinateValueSchema,
  altitude: numberField,
  aka: numberField
    .min(AZIMUTH_DEGREE_MIN, AZIMUTH_MIN_MESSAGE)
    .max(AZIMUTH_DEGREE_MAX, AZIMUTH_MAX_MESSAGE),
  pitch: pitchRollSchema,
  roll: pitchRollSchema,
  primarySector: sectorSchema,
  secondarySector: sectorSchema,
  plusTenApplied: plusTenAppliedSchema,
  obstacles: z.array(obstacleSchema).optional(),
}

/** Archive: vehicleId stays optional (default vehicle, no צ׳ field in UI). */
const positionFormObjectSchema = z.object({
  ...sharedPositionFields,
  launcherType: z.enum(['vehicle', 'infantry']),
  vehicleId: z.string().optional(),
})

const launcherAndVehicleForCurrent = z.discriminatedUnion('launcherType', [
  z.object({
    launcherType: z.literal(LAUNCHER_TYPES.VEHICLE),
    vehicleId: z.string().trim().min(1, 'שדה חובה'),
  }),
  z.object({
    launcherType: z.literal(LAUNCHER_TYPES.INFANTRY),
    vehicleId: z.string().optional(),
  }),
])

/** Current: vehicleId mandatory for vehicle — same idea as pitch (declarative Zod on the branch). */
const currentPositionFormObjectSchema = z.intersection(z.object(sharedPositionFields), launcherAndVehicleForCurrent)

type PositionFormPlusTenPayload =
  | z.infer<typeof positionFormObjectSchema>
  | z.infer<typeof currentPositionFormObjectSchema>

function refinePlusTenApplied(data: PositionFormPlusTenPayload, ctx: z.RefinementCtx) {
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
}

/** Archive add/edit (no vehicle field in UI when default is vehicle). */
export const schema = positionFormObjectSchema.superRefine(refinePlusTenApplied)

export const currentPositionFormSchema = currentPositionFormObjectSchema.superRefine((data, ctx) => {
  refinePlusTenApplied(data, ctx)
})

export type PositionFormValues = z.infer<typeof positionFormObjectSchema>

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
