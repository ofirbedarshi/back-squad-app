import assert from 'node:assert/strict'
import { describe, it } from 'node:test'
import { latLngToUtm, utmToLatLng } from './utmConversion.ts'

describe('utmConversion', () => {
  it('converts zone 36N UTM to lat/lng near Israel', () => {
    const result = utmToLatLng({
      easting: 700000,
      northing: 3500000,
      zone: 36,
      northernHemisphere: true,
    })

    assert.ok(result.latitude > 31 && result.latitude < 32)
    assert.ok(result.longitude > 34 && result.longitude < 36)
  })

  it('round-trips lat/lng through zone 36N UTM', () => {
    const lat = 32.0853
    const lng = 34.7818
    const utm = latLngToUtm({
      latitude: lat,
      longitude: lng,
      zone: 36,
      northernHemisphere: true,
    })
    const back = utmToLatLng({
      easting: utm.easting,
      northing: utm.northing,
      zone: utm.zone,
      northernHemisphere: utm.northernHemisphere,
    })

    assert.ok(Math.abs(back.latitude - lat) < 1e-6)
    assert.ok(Math.abs(back.longitude - lng) < 1e-6)
  })
})
