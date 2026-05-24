import assert from 'node:assert/strict'
import { describe, it } from 'node:test'
import {
  applyNadbarLinks,
  assertNadbarLinksForSave,
  createNadbarFromTemplate,
  hasCompleteNadbarLinks,
  isValidNadbar,
  nadbarRequiresEntityLinks,
  NADBAR_SAVE_LINKS_REQUIRED_MESSAGE,
  parseNadbarTemplate,
} from './nadbar.ts'
import { getNadbarTemplate } from './nadbarTemplates.ts'
import { assertNadbarSaveableUseCase } from '../useCases/assertNadbarSaveable.ts'
import type { NadbarMessage } from './nadbar.types.ts'

function blocksFromMessages(messages: NadbarMessage[]) {
  return { blocks: [{ messages }] }
}

describe('nadbarRequiresEntityLinks', () => {
  it('is false only for PointerTeamUpdated', () => {
    assert.equal(nadbarRequiresEntityLinks('PointerTeamUpdated'), false)
    assert.equal(nadbarRequiresEntityLinks('PointerTeam'), true)
    assert.equal(nadbarRequiresEntityLinks('Katmam'), true)
    assert.equal(nadbarRequiresEntityLinks('TzurPointer'), true)
  })
})

describe('assertNadbarSaveableUseCase', () => {
  it('allows PointerTeamUpdated without links', () => {
    const nadbar = createNadbarFromTemplate(
      'PointerTeamUpdated',
      blocksFromMessages([{ source: 'Me', content: 'בדיקה' }]),
    )
    assert.equal(nadbar.links, undefined)
    assert.doesNotThrow(() => assertNadbarSaveableUseCase(nadbar))
  })

  it('requires links for other types', () => {
    const nadbar = createNadbarFromTemplate(
      'Katmam',
      blocksFromMessages([{ source: 'Me', content: 'בדיקה' }]),
    )
    assert.throws(
      () => assertNadbarSaveableUseCase(nadbar),
      (error: unknown) =>
        error instanceof Error && error.message === NADBAR_SAVE_LINKS_REQUIRED_MESSAGE,
    )
  })
})

describe('parseNadbarTemplate', () => {
  it('accepts blocks array', () => {
    const template = parseNadbarTemplate({
      blocks: [
        {
          messages: [{ source: 'Me', content: 'א' }],
        },
        {
          messages: [{ source: 'They', content: 'ב' }],
        },
      ],
    })
    assert.equal(template.blocks.length, 2)
    assert.equal(template.blocks[1]?.messages[0]?.source, 'They')
  })

  it('rejects empty template', () => {
    assert.throws(() => parseNadbarTemplate({ blocks: [] }), /בלוקים/)
    assert.throws(() => parseNadbarTemplate({ messages: [] }), /בלוקים/)
  })

  it('rejects invalid source in block', () => {
    assert.throws(
      () =>
        parseNadbarTemplate({
          blocks: [{ messages: [{ source: 'Other', content: 'x' }] }],
        }),
      /לא תקינים/,
    )
  })
})

describe('createNadbarFromTemplate', () => {
  it('creates nadbar with id, timestamps, and copied message blocks', () => {
    const template = blocksFromMessages([{ source: 'Me' as const, content: 'בדיקה' }])
    const nadbar = createNadbarFromTemplate('Katmam', template)
    assert.ok(nadbar.id)
    assert.equal(nadbar.type, 'Katmam')
    assert.equal(nadbar.messageBlocks[0]?.messages[0]?.content, 'בדיקה')
    assert.notEqual(nadbar.messageBlocks[0]?.messages[0], template.blocks[0]?.messages[0])
    assert.ok(isValidNadbar(nadbar))
  })
})

describe('getNadbarTemplate', () => {
  it('returns template for each type', () => {
    for (const type of ['PointerTeam', 'PointerTeamUpdated', 'Katmam', 'TzurPointer'] as const) {
      const template = getNadbarTemplate(type)
      assert.ok(template.blocks.length > 0)
      assert.ok(template.blocks[0]?.messages.length > 0)
    }
  })

  it('PointerTeamUpdated has one block with four messages', () => {
    const template = getNadbarTemplate('PointerTeamUpdated')
    assert.equal(template.blocks.length, 1)
    assert.equal(template.blocks[0]?.messages.length, 4)
  })
})

describe('applyNadbarLinks', () => {
  it('sets pointer, target, and position ids and updates updatedAt', () => {
    const nadbar = {
      ...createNadbarFromTemplate(
        'Katmam',
        blocksFromMessages([{ source: 'Me', content: 'בדיקה' }]),
      ),
      updatedAt: '2020-01-01T00:00:00.000Z',
    }
    const updated = applyNadbarLinks(nadbar, {
      pointerId: 'pointer-1',
      targetId: 'target-1',
      positionId: 'position-1',
    })
    assert.equal(updated.links?.pointerId, 'pointer-1')
    assert.equal(updated.links?.targetId, 'target-1')
    assert.equal(updated.links?.positionId, 'position-1')
    assert.notEqual(updated.updatedAt, nadbar.updatedAt)
  })

  it('clears links when passed null', () => {
    const nadbar = createNadbarFromTemplate(
      'Katmam',
      blocksFromMessages([{ source: 'Me', content: 'בדיקה' }]),
    )
    const withLinks = applyNadbarLinks(nadbar, {
      pointerId: 'pointer-1',
      targetId: 'target-1',
      positionId: 'position-1',
    })
    const cleared = applyNadbarLinks(withLinks, {
      pointerId: null,
      targetId: null,
      positionId: null,
    })
    assert.equal(cleared.links, undefined)
  })
})

describe('assertNadbarLinksForSave', () => {
  it('throws when any link id is missing', () => {
    assert.throws(
      () => assertNadbarLinksForSave({ pointerId: 'pointer-1', targetId: 'target-1' }),
      (error: unknown) =>
        error instanceof Error && error.message === NADBAR_SAVE_LINKS_REQUIRED_MESSAGE,
    )
  })

  it('does not throw when all link ids are present', () => {
    assert.doesNotThrow(() =>
      assertNadbarLinksForSave({
        pointerId: 'pointer-1',
        targetId: 'target-1',
        positionId: 'position-1',
      }),
    )
  })
})

describe('hasCompleteNadbarLinks', () => {
  it('requires pointer, target, and position ids', () => {
    assert.equal(hasCompleteNadbarLinks(undefined), false)
    assert.equal(hasCompleteNadbarLinks({ pointerId: 'pointer-1' }), false)
    assert.equal(hasCompleteNadbarLinks({ targetId: 'target-1' }), false)
    assert.equal(
      hasCompleteNadbarLinks({ pointerId: 'pointer-1', targetId: 'target-1' }),
      false,
    )
    assert.equal(
      hasCompleteNadbarLinks({
        pointerId: 'pointer-1',
        targetId: 'target-1',
        positionId: 'position-1',
      }),
      true,
    )
  })
})

describe('isValidNadbar', () => {
  it('accepts optional pointer and target ids', () => {
    const nadbar = createNadbarFromTemplate(
      'Katmam',
      blocksFromMessages([{ source: 'Me', content: 'בדיקה' }]),
    )
    const withLinks = applyNadbarLinks(nadbar, {
      pointerId: 'pointer-1',
      targetId: 'target-1',
      positionId: 'position-1',
    })
    assert.ok(isValidNadbar(withLinks))
  })

  it('rejects record missing required fields', () => {
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

  it('rejects saved shape with messages instead of messageBlocks', () => {
    const nadbar = createNadbarFromTemplate(
      'Katmam',
      blocksFromMessages([{ source: 'Me', content: 'בדיקה' }]),
    )
    assert.equal(
      isValidNadbar({
        ...nadbar,
        messageBlocks: undefined,
        messages: [{ source: 'Me', content: 'בדיקה' }],
      }),
      false,
    )
  })

  it('rejects top-level link ids outside links', () => {
    const nadbar = createNadbarFromTemplate(
      'Katmam',
      blocksFromMessages([{ source: 'Me', content: 'בדיקה' }]),
    )
    assert.equal(
      isValidNadbar({ ...nadbar, pointerId: 'pointer-1', targetId: 'target-1' }),
      false,
    )
  })
})
