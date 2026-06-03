export interface UtmCoordinateInput {
  easting: number
  northing: number
  zone: number
  northernHemisphere: boolean
}

export interface LatLngCoordinateInput {
  latitude: number
  longitude: number
  zone: number
  northernHemisphere: boolean
}

export interface LatLngResult {
  latitude: number
  longitude: number
}

export interface UtmResult {
  easting: number
  northing: number
  zone: number
  northernHemisphere: boolean
}
