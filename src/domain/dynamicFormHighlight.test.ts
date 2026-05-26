import assert from 'node:assert/strict'
import { describe, it } from 'node:test'
import { shouldHighlightCheckboxWithFieldsBorder } from './dynamicFormHighlight.ts'

describe('shouldHighlightCheckboxWithFieldsBorder', () => {
  it('returns false when rules are undefined or empty', () => {
    assert.equal(shouldHighlightCheckboxWithFieldsBorder({}), false)
    assert.equal(shouldHighlightCheckboxWithFieldsBorder({}, [], []), false)
  })

  it('returns false when no rule matches', () => {
    assert.equal(
      shouldHighlightCheckboxWithFieldsBorder(
        { nearTargetWeatherWind: 'לא' },
        [{ field: 'nearTargetWeatherWind', equals: 'כן' }],
      ),
      false,
    )
  })

  it('returns true when a single rule matches', () => {
    assert.equal(
      shouldHighlightCheckboxWithFieldsBorder(
        { attackCellFlightAltitudeWeatherValid: 'לא' },
        [{ field: 'attackCellFlightAltitudeWeatherValid', equals: 'לא' }],
      ),
      true,
    )
  })

  it('returns true when any of multiple rules matches', () => {
    const rules = [
      { field: 'nearTargetWeatherWind', equals: 'כן' },
      { field: 'nearTargetWeatherCloudsOrHaze', equals: 'כן' },
      { field: 'nearTargetWeatherRain', equals: 'כן' },
    ]
    assert.equal(
      shouldHighlightCheckboxWithFieldsBorder(
        {
          nearTargetWeatherWind: 'לא',
          nearTargetWeatherCloudsOrHaze: 'כן',
          nearTargetWeatherRain: 'לא',
        },
        rules,
      ),
      true,
    )
    assert.equal(
      shouldHighlightCheckboxWithFieldsBorder(
        {
          nearTargetWeatherWind: 'לא',
          nearTargetWeatherCloudsOrHaze: 'לא',
          nearTargetWeatherRain: 'לא',
        },
        rules,
      ),
      false,
    )
  })

  it('returns true when numeric value is greater than threshold', () => {
    assert.equal(
      shouldHighlightCheckboxWithFieldsBorder(
        { indicatorAmuraApexAngle: 56 },
        [{ field: 'indicatorAmuraApexAngle', greaterThan: 55 }],
      ),
      true,
    )
    assert.equal(
      shouldHighlightCheckboxWithFieldsBorder(
        { indicatorAmuraApexAngle: 55 },
        [{ field: 'indicatorAmuraApexAngle', greaterThan: 55 }],
      ),
      false,
    )
    assert.equal(
      shouldHighlightCheckboxWithFieldsBorder(
        { indicatorAmuraApexAngle: '' },
        [{ field: 'indicatorAmuraApexAngle', greaterThan: 55 }],
      ),
      false,
    )
  })

  it('returns true only when all rules in whenAll match', () => {
    const allRules = [
      { field: 'hadDirectionalShooting', equals: 'כן' },
      { field: 'missionRangeMeters', greaterThan: 8000 },
    ]
    assert.equal(
      shouldHighlightCheckboxWithFieldsBorder(
        { hadDirectionalShooting: 'כן', missionRangeMeters: 8001 },
        undefined,
        allRules,
      ),
      true,
    )
    assert.equal(
      shouldHighlightCheckboxWithFieldsBorder(
        { hadDirectionalShooting: 'כן', missionRangeMeters: 8000 },
        undefined,
        allRules,
      ),
      false,
    )
    assert.equal(
      shouldHighlightCheckboxWithFieldsBorder(
        { hadDirectionalShooting: 'לא', missionRangeMeters: 9000 },
        undefined,
        allRules,
      ),
      false,
    )
  })
})
