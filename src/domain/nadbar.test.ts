import assert from 'node:assert/strict'
import { describe, it } from 'node:test'
import {
  createNadbarFromTemplate,
  isValidNadbar,
  parseNadbarTemplate,
} from './nadbar.ts'
import { getNadbarTemplate } from './nadbarTemplates.ts'

describe('parseNadbarTemplate', () => {
  it('accepts valid template', () => {
    const template = parseNadbarTemplate({
      messages: [
        { source: 'They', content: 'שלום' },
        { source: 'Me', content: 'היי' },
      ],
    })
    assert.equal(template.messages.length, 2)
    assert.equal(template.messages[0]?.source, 'They')
  })

  it('rejects empty messages', () => {
    assert.throws(() => parseNadbarTemplate({ messages: [] }), /הודעות/)
  })

  it('rejects invalid source', () => {
    assert.throws(
      () =>
        parseNadbarTemplate({
          messages: [{ source: 'Other', content: 'x' }],
        }),
      /לא תקינות/,
    )
  })
})

describe('createNadbarFromTemplate', () => {
  it('creates nadbar with id, timestamps, and copied messages', () => {
    const template = { messages: [{ source: 'Me' as const, content: 'בדיקה' }] }
    const nadbar = createNadbarFromTemplate('Katmam', template)
    assert.ok(nadbar.id)
    assert.equal(nadbar.type, 'Katmam')
    assert.equal(nadbar.messages[0]?.content, 'בדיקה')
    assert.notEqual(nadbar.messages[0], template.messages[0])
    assert.ok(isValidNadbar(nadbar))
  })
})

describe('getNadbarTemplate', () => {
  it('returns template for each type', () => {
    for (const type of ['PointerTeam', 'Katmam', 'TzurPointer'] as const) {
      const template = getNadbarTemplate(type)
      assert.ok(template.messages.length > 0)
    }
  })
})

describe('isValidNadbar', () => {
  it('rejects legacy savedAt shape', () => {
    assert.equal(
      isValidNadbar({
        id: '1',
        savedAt: '2020-01-01',
        type: 'Katmam',
        data: {},
      }),
      false,
    )
  })
})
