import assert from 'node:assert/strict'
import { describe, it } from 'node:test'
import type { Indicator } from '../domain/indicator.types'
import type { Position } from '../domain/position.types'
import type { Target } from '../domain/target.types'
import type { NadbarMessage } from '../domain/nadbar.types'
import {
  buildUserVarFirstMessageIndex,
  fillNadbarMessageContent,
  filterVisibleNadbarMessages,
  isNadbarMessageVisible,
  isNadbarUserVarEditableAt,
  parseNadbarMessageSegments,
  resolveNadbarUserVarDisplayValue,
  resolveResourceSegment,
  sanitizeNadbarNumericUserVarInput,
} from './nadbarMessageFill'

const indicator: Indicator = {
  id: 'pointer-1',
  indicatorName: 'מציין בטא',
  coordinates: { east: '300000', north: '4000000', palach: '36' },
  altitude: 100,
  means: 'שיח',
  markCode: 42,
  updatedAt: '2026-05-01T10:00:00.000Z',
}

const target: Target = {
  id: 'target-1',
  updatedAt: '2026-05-01T10:00:00.000Z',
  targetName: '7',
  coordinates: { east: '12', north: '34', palach: '36' },
  altitude: 440,
}

const position: Position = {
  id: 'position-1',
  updatedAt: '2026-05-01T10:00:00.000Z',
  stationName: 'עמדה אלפא',
  coordinates: { east: '100', north: '200', palach: '36' },
  altitude: 50,
}

describe('fillNadbarMessageContent', () => {
  it('replaces indicator.markCode when indicator is present', () => {
    const content = 'קבל, קו״צ {{indicator.markCode}}. כמו כן, גור ____'
    assert.equal(
      fillNadbarMessageContent(content, { indicator }),
      'קבל, קו״צ <u>42</u>. כמו כן, גור ____',
    )
  })

  it('shows load indicator prompt when indicator is missing', () => {
    const content = 'קיבלתי, קו״צ {{indicator.markCode}}, גור ____'
    assert.equal(
      fillNadbarMessageContent(content, {}),
      'קיבלתי, קו״צ <span class="text-red-600 font-medium">נא לטעון מציין</span>, גור ____',
    )
  })

  it('replaces target name and coordinates when target is present', () => {
    const content =
      'קבל למטרה {{target.targetName}} (מספר שלם) מרעום {{target.coordinates.east}} (ספרה ספרה) צפע {{target.coordinates.north}} (ספרה ספרה)'
    assert.equal(
      fillNadbarMessageContent(content, { target }),
      'קבל למטרה <u>7</u> (מספר שלם) מרעום <u>12</u> (ספרה ספרה) צפע <u>34</u> (ספרה ספרה)',
    )
  })

  it('replaces target altitude (גמל) when target is present', () => {
    const content = 'כמו כן, גמל {{target.altitude}} במטרים. (מספר שלם)'
    assert.equal(fillNadbarMessageContent(content, { target }), 'כמו כן, גמל <u>440</u> במטרים. (מספר שלם)')
  })

  it('keeps target altitude token when altitude is missing', () => {
    const targetWithoutAltitude: Target = {
      id: 'target-2',
      updatedAt: '2026-05-01T10:00:00.000Z',
      targetName: '8',
      coordinates: { east: '1', north: '2', palach: '36' },
    }
    const content = 'גמל {{target.altitude}} במטרים'
    assert.equal(fillNadbarMessageContent(content, { target: targetWithoutAltitude }), content)
  })

  it('replaces position station name when position is present', () => {
    const content = 'שם עמדת שיגור {{position.stationName}} (שם עמדה)'
    assert.equal(
      fillNadbarMessageContent(content, { position }),
      'שם עמדת שיגור <u>עמדה אלפא</u> (שם עמדה)',
    )
  })

  it('shows load position prompt when position is missing', () => {
    const prompt = '<span class="text-red-600 font-medium">נא לטעון עמדה</span>'
    const content = 'שם עמדת שיגור {{position.stationName}}'
    assert.equal(fillNadbarMessageContent(content, {}), `שם עמדת שיגור ${prompt}`)
  })

  it('shows load target prompt when target is missing', () => {
    const prompt = '<span class="text-red-600 font-medium">נא לטעון מטרה</span>'
    const content = 'למטרה {{target.targetName}} מרעום {{target.coordinates.east}} צפע {{target.coordinates.north}}'
    assert.equal(
      fillNadbarMessageContent(content, {}),
      `למטרה ${prompt} מרעום ${prompt} צפע ${prompt}`,
    )
  })

  it('leaves unknown tokens and plain blanks untouched', () => {
    const content = 'למטרה ____ ו-{{target.unknownField}}'
    assert.equal(fillNadbarMessageContent(content, { indicator, target }), content)
  })

  it('leaves user var tokens untouched in They fill', () => {
    const content = 'גור {{gur}} ו-{{indicator.markCode}}'
    assert.equal(
      fillNadbarMessageContent(content, { indicator }),
      'גור {{gur}} ו-<u>42</u>',
    )
  })
})

describe('parseNadbarMessageSegments', () => {
  it('splits resource and user var tokens', () => {
    const segments = parseNadbarMessageSegments(
      'גור {{gur}} קו״צ {{indicator.markCode}}',
    )
    assert.deepEqual(segments, [
      { type: 'text', text: 'גור ' },
      { type: 'userVar', varName: 'gur' },
      { type: 'text', text: ' קו״צ ' },
      { type: 'resource', tokenKey: 'indicator.markCode' },
    ])
  })
})

const pointerTeamUpdatedEchoMessages: NadbarMessage[] = [
  { source: 'They', content: '{{openingCallsign1}} מ {{openingCallsign2}} האם אתה מבלה בענבים' },
  { source: 'Me', content: 'חיובי, מבלה בענבים / שלילי עוד __ קטנות' },
  { source: 'They', content: 'קבל קוץ {{kutz}} כמו כן גור {{gur}} מעל פני הים' },
  { source: 'Me', content: 'קיבלתי קוץ {{kutz}} כמו כן גור {{gur}} מעל פני הים' },
]

describe('resolveNadbarUserVarDisplayValue', () => {
  const varInitialFromBlock = { openingCallsign1: 0, openingCallsign2: 0 }

  it('returns empty when no local or source value', () => {
    assert.equal(
      resolveNadbarUserVarDisplayValue('openingCallsign1', 2, [{}, {}, {}], varInitialFromBlock),
      '',
    )
  })

  it('falls back to source block when var was never set on current block', () => {
    const blockMessageVars = [{ openingCallsign1: 'אלפא' }, {}, {}]
    assert.equal(
      resolveNadbarUserVarDisplayValue(
        'openingCallsign1',
        2,
        blockMessageVars,
        varInitialFromBlock,
      ),
      'אלפא',
    )
  })

  it('does not fall back when user cleared var to empty on current block', () => {
    const blockMessageVars = [{ openingCallsign1: 'אלפא' }, {}, { openingCallsign1: '' }]
    assert.equal(
      resolveNadbarUserVarDisplayValue(
        'openingCallsign1',
        2,
        blockMessageVars,
        varInitialFromBlock,
      ),
      '',
    )
  })

  it('prefers local block value over source block', () => {
    const blockMessageVars = [
      { openingCallsign1: 'אלפא' },
      {},
      { openingCallsign1: 'בטא' },
    ]
    assert.equal(
      resolveNadbarUserVarDisplayValue(
        'openingCallsign1',
        2,
        blockMessageVars,
        varInitialFromBlock,
      ),
      'בטא',
    )
  })

  it('does not fall back for unmapped vars', () => {
    const blockMessageVars = [{ metara: 'מטרה א' }, {}, {}]
    assert.equal(
      resolveNadbarUserVarDisplayValue('metara', 2, blockMessageVars, varInitialFromBlock),
      '',
    )
  })

  it('does not read source when source block index equals current block', () => {
    const blockMessageVars = [{ openingCallsign1: 'אלפא' }]
    assert.equal(
      resolveNadbarUserVarDisplayValue(
        'openingCallsign1',
        0,
        blockMessageVars,
        { openingCallsign1: 0 },
      ),
      'אלפא',
    )
  })
})

describe('buildUserVarFirstMessageIndex', () => {
  it('records first message index per user var', () => {
    const index = buildUserVarFirstMessageIndex(pointerTeamUpdatedEchoMessages)
    assert.equal(index.get('openingCallsign1'), 0)
    assert.equal(index.get('openingCallsign2'), 0)
    assert.equal(index.get('kutz'), 2)
    assert.equal(index.get('gur'), 2)
  })
})

describe('isNadbarUserVarEditableAt', () => {
  it('allows kutz and gur only on first occurrence message', () => {
    assert.equal(isNadbarUserVarEditableAt(pointerTeamUpdatedEchoMessages, 2, 'kutz'), true)
    assert.equal(isNadbarUserVarEditableAt(pointerTeamUpdatedEchoMessages, 2, 'gur'), true)
    assert.equal(isNadbarUserVarEditableAt(pointerTeamUpdatedEchoMessages, 3, 'kutz'), false)
    assert.equal(isNadbarUserVarEditableAt(pointerTeamUpdatedEchoMessages, 3, 'gur'), false)
  })

  it('resets first occurrence per block when using block-local messages', () => {
    const blockA = [{ source: 'They' as const, content: '{{kutz}}' }]
    const blockB = [{ source: 'Me' as const, content: '{{kutz}}' }]
    assert.equal(isNadbarUserVarEditableAt(blockA, 0, 'kutz'), true)
    assert.equal(isNadbarUserVarEditableAt(blockB, 0, 'kutz'), true)
  })
})

describe('sanitizeNadbarNumericUserVarInput', () => {
  it('keeps digits only', () => {
    assert.equal(sanitizeNadbarNumericUserVarInput('123abc456'), '123456')
    assert.equal(sanitizeNadbarNumericUserVarInput(''), '')
    assert.equal(sanitizeNadbarNumericUserVarInput('12.34'), '1234')
  })
})

describe('isNadbarMessageVisible', () => {
  const conditionalMessage = {
    source: 'They' as const,
    content: 'שפר',
    visibleWhen: { var: 'amuraValid', equals: 'לא תקינה' },
  }

  it('shows message without visibleWhen', () => {
    assert.equal(isNadbarMessageVisible({ source: 'They', content: 'x' }, {}), true)
  })

  it('shows conditional message when var matches', () => {
    assert.equal(isNadbarMessageVisible(conditionalMessage, { amuraValid: 'לא תקינה' }), true)
  })

  it('hides conditional message when var does not match', () => {
    assert.equal(isNadbarMessageVisible(conditionalMessage, { amuraValid: 'תקינה' }), false)
    assert.equal(isNadbarMessageVisible(conditionalMessage, {}), false)
  })
})

describe('filterVisibleNadbarMessages', () => {
  const messages = [
    { source: 'They' as const, content: 'א' },
    {
      source: 'Me' as const,
      content: 'ב',
      visibleWhen: { var: 'amuraValid', equals: 'לא תקינה' },
    },
  ]

  it('returns all messages when no conditions apply', () => {
    assert.equal(filterVisibleNadbarMessages(messages, {}).length, 1)
  })

  it('includes conditional messages when condition is met', () => {
    assert.equal(filterVisibleNadbarMessages(messages, { amuraValid: 'לא תקינה' }).length, 2)
  })

  it('hides extra obstacle messages until activation flags are set', () => {
    const obstacleMessages = [
      { source: 'Me' as const, content: 'שאלה {{hasNearbyObstacles}}' },
      {
        source: 'They' as const,
        content: 'הסתר 2 {{obstacleHeight2}}',
        visibleWhen: { var: 'obstacleActive2', equals: '1' },
      },
    ]

    assert.equal(filterVisibleNadbarMessages(obstacleMessages, { hasNearbyObstacles: 'חיובי' }).length, 1)
    assert.equal(
      filterVisibleNadbarMessages(obstacleMessages, {
        hasNearbyObstacles: 'חיובי',
        obstacleActive2: '1',
      }).length,
      2,
    )
  })
})

describe('resolveResourceSegment', () => {
  it('returns value when resource is loaded', () => {
    assert.deepEqual(resolveResourceSegment('target.targetName', { target }), {
      type: 'value',
      value: '7',
    })
  })

  it('returns missing prompt when link resource is absent', () => {
    assert.deepEqual(resolveResourceSegment('indicator.markCode', {}), {
      type: 'missing',
      prompt: 'נא לטעון מציין',
    })
  })

  it('returns position station name when position is loaded', () => {
    assert.deepEqual(resolveResourceSegment('position.stationName', { position }), {
      type: 'value',
      value: 'עמדה אלפא',
    })
  })
})
