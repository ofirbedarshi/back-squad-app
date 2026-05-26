import assert from 'node:assert/strict'
import { describe, it } from 'node:test'
import { shouldHighlightCheckboxWithFieldsBorder } from './dynamicFormHighlight.ts'

describe('shouldHighlightCheckboxWithFieldsBorder', () => {
  it('returns false when rules are undefined or empty', () => {
    assert.equal(shouldHighlightCheckboxWithFieldsBorder(undefined, {}), false)
    assert.equal(shouldHighlightCheckboxWithFieldsBorder([], {}), false)
  })

  it('returns false when no rule matches', () => {
    assert.equal(
      shouldHighlightCheckboxWithFieldsBorder(
        [{ field: 'nearTargetWeatherWind', equals: 'כן' }],
        { nearTargetWeatherWind: 'לא' },
      ),
      false,
    )
  })

  it('returns true when a single rule matches', () => {
    assert.equal(
      shouldHighlightCheckboxWithFieldsBorder(
        [{ field: 'attackCellFlightAltitudeWeatherValid', equals: 'לא' }],
        { attackCellFlightAltitudeWeatherValid: 'לא' },
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
      shouldHighlightCheckboxWithFieldsBorder(rules, {
        nearTargetWeatherWind: 'לא',
        nearTargetWeatherCloudsOrHaze: 'כן',
        nearTargetWeatherRain: 'לא',
      }),
      true,
    )
    assert.equal(
      shouldHighlightCheckboxWithFieldsBorder(rules, {
        nearTargetWeatherWind: 'לא',
        nearTargetWeatherCloudsOrHaze: 'לא',
        nearTargetWeatherRain: 'לא',
      }),
      false,
    )
  })

  it('returns true when numeric value is greater than threshold', () => {
    assert.equal(
      shouldHighlightCheckboxWithFieldsBorder(
        [{ field: 'indicatorAmuraApexAngle', greaterThan: 55 }],
        { indicatorAmuraApexAngle: 56 },
      ),
      true,
    )
    assert.equal(
      shouldHighlightCheckboxWithFieldsBorder(
        [{ field: 'indicatorAmuraApexAngle', greaterThan: 55 }],
        { indicatorAmuraApexAngle: 55 },
      ),
      false,
    )
    assert.equal(
      shouldHighlightCheckboxWithFieldsBorder(
        [{ field: 'indicatorAmuraApexAngle', greaterThan: 55 }],
        { indicatorAmuraApexAngle: '' },
      ),
      false,
    )
  })
})
