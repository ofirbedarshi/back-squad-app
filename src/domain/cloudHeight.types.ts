export type CloudHeightUnit = 'meters' | 'feet'

export interface CloudHeightSettings {
  /** Always stored in meters. null means not set. */
  heightMeters: number | null
  displayUnit: CloudHeightUnit
}
