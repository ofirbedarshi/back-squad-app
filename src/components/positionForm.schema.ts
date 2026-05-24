import { z } from 'zod'
import { pitchRollSchema } from './pitchRollInput.utils'
import { coordinateValueSchema } from './base/coordinateInput.utils'
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

const boundarySchema = z.object({
  compass: optionalDegreeField,
  target: optionalDegreeField,
})

const sectorSchema = z.object({
  left: boundarySchema,
  right: boundarySchema,
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
  primarySector: sectorSchema.optional(),
  secondarySector: sectorSchema.optional(),
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

/** Archive add/edit (no vehicle field in UI when default is vehicle). */
export const schema = positionFormObjectSchema

export const currentPositionFormSchema = currentPositionFormObjectSchema

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

export function parseDegreeInput(v: string): number | undefined {
  if (v === '' || v === null || v === undefined) return undefined
  const n = parseFloat(v)
  return isNaN(n) ? undefined : n
}

export const degreeOpts = { setValueAs: parseDegreeInput }
