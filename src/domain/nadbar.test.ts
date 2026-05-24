import assert from 'node:assert/strict'
import { describe, it } from 'node:test'
import {
  applyNadbarLinks,
  assertNadbarLinksForSave,
  createNadbarFromTemplate,
  getNadbarBlockMessageVars,
  hasCompleteNadbarLinks,
  isNadbarUserVarNumeric,
  isNadbarUserVarChoice,
  isValidNadbar,
  nadbarRequiresEntityLinks,
  NADBAR_SAVE_LINKS_REQUIRED_MESSAGE,
  parseNadbarTemplate,
  updateNadbarBlockMessageVar,
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

  it('parses userVarFields with numeric input', () => {
    const template = parseNadbarTemplate({
      userVarFields: {
        meraom: { input: 'numeric' },
      },
      blocks: [{ messages: [{ source: 'They', content: '{{meraom}}' }] }],
    })
    assert.deepEqual(template.userVarFields, { meraom: { input: 'numeric' } })
  })

  it('parses userVarFields with choice input', () => {
    const template = parseNadbarTemplate({
      userVarFields: {
        amuraValid: { input: 'choice', options: ['תקינה', 'לא תקינה'] },
      },
      blocks: [{ messages: [{ source: 'They', content: '{{amuraValid}}' }] }],
    })
    assert.deepEqual(template.userVarFields, {
      amuraValid: { input: 'choice', options: ['תקינה', 'לא תקינה'] },
    })
  })

  it('rejects choice userVarFields without valid options', () => {
    assert.throws(
      () =>
        parseNadbarTemplate({
          userVarFields: { amuraValid: { input: 'choice', options: ['תקינה'] } },
          blocks: [{ messages: [{ source: 'They', content: 'x' }] }],
        }),
      /אפשרויות בחירה לא תקינות/,
    )
  })

  it('rejects invalid userVarFields', () => {
    assert.throws(
      () =>
        parseNadbarTemplate({
          userVarFields: { meraom: { input: 'text' } },
          blocks: [{ messages: [{ source: 'They', content: 'x' }] }],
        }),
      /סוג קלט לא נתמך/,
    )
  })

  it('parses block footerActions', () => {
    const template = parseNadbarTemplate({
      blocks: [
        { messages: [{ source: 'They', content: 'א' }] },
        {
          footerActions: ['createTargetFromVars'],
          messages: [{ source: 'They', content: 'ב' }],
        },
        {
          footerActions: ['loadTarget'],
          messages: [{ source: 'They', content: 'ג' }],
        },
      ],
    })
    assert.deepEqual(template.blocks[1]?.footerActions, ['createTargetFromVars'])
    assert.deepEqual(template.blocks[2]?.footerActions, ['loadTarget'])
  })

  it('rejects invalid block footerActions', () => {
    assert.throws(
      () =>
        parseNadbarTemplate({
          blocks: [
            {
              footerActions: ['unknownAction'],
              messages: [{ source: 'They', content: 'x' }],
            },
          ],
        }),
      /לא תקינים|לא נתמכת/,
    )
  })

  it('parses message visibleWhen', () => {
    const template = parseNadbarTemplate({
      blocks: [
        {
          messages: [
            { source: 'They', content: 'א' },
            {
              source: 'Me',
              content: 'ב',
              visibleWhen: { var: 'amuraValid', equals: 'לא תקינה' },
            },
          ],
        },
      ],
    })
    assert.deepEqual(template.blocks[0]?.messages[1]?.visibleWhen, {
      var: 'amuraValid',
      equals: 'לא תקינה',
    })
  })

  it('rejects invalid message visibleWhen', () => {
    assert.throws(
      () =>
        parseNadbarTemplate({
          blocks: [
            {
              messages: [
                {
                  source: 'They',
                  content: 'x',
                  visibleWhen: { var: '', equals: 'y' },
                },
              ],
            },
          ],
        }),
      /visibleWhen לא תקין|לא תקינים/,
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

  it('initializes empty blockMessageVars per template block', () => {
    const template = getNadbarTemplate('PointerTeamUpdated')
    const nadbar = createNadbarFromTemplate('PointerTeamUpdated', template)
    assert.equal(nadbar.blockMessageVars?.length, 4)
    assert.deepEqual(nadbar.blockMessageVars, [{}, {}, {}, {}])
    assert.ok(isValidNadbar(nadbar))
  })
})

describe('updateNadbarBlockMessageVar', () => {
  it('updates vars only for the given block index', () => {
    const template = getNadbarTemplate('PointerTeamUpdated')
    const nadbar = createNadbarFromTemplate('PointerTeamUpdated', template)
    const updated = updateNadbarBlockMessageVar(nadbar, 0, 'metara', 'block-0')
    const alsoUpdated = updateNadbarBlockMessageVar(updated, 1, 'metara', 'block-1')

    assert.equal(getNadbarBlockMessageVars(alsoUpdated, 0).metara, 'block-0')
    assert.equal(getNadbarBlockMessageVars(alsoUpdated, 1).metara, 'block-1')
    assert.equal(getNadbarBlockMessageVars(alsoUpdated, 2).metara, undefined)
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

  it('PointerTeamUpdated has four blocks', () => {
    const template = getNadbarTemplate('PointerTeamUpdated')
    assert.equal(template.blocks.length, 4)
    assert.equal(template.blocks[0]?.messages.length, 4)
    assert.equal(template.blocks[1]?.messages.length, 6)
    assert.equal(template.blocks[2]?.messages.length, 5)
    assert.equal(template.blocks[3]?.messages.length, 9)
    assert.deepEqual(template.userVarFields, {
      meraom: { input: 'numeric' },
      tsepa: { input: 'numeric' },
      gamal: { input: 'numeric' },
      amura: { input: 'numeric' },
      amuraCorrected: { input: 'numeric' },
      amuraValid: { input: 'choice', options: ['תקינה', 'לא תקינה'] },
      hasNearbyObstacles: { input: 'choice', options: ['שלילי', 'חיובי'] },
      obstacleHeight1: { input: 'numeric' },
      obstacleDistance1: { input: 'numeric' },
      obstacleHeight2: { input: 'numeric' },
      obstacleDistance2: { input: 'numeric' },
      obstacleHeight3: { input: 'numeric' },
      obstacleDistance3: { input: 'numeric' },
    })
    assert.deepEqual(template.blocks[1]?.footerActions, ['createTargetFromVars'])
    assert.deepEqual(template.blocks[2]?.footerActions, ['loadTarget'])
    assert.deepEqual(template.blocks[3]?.footerActions, ['loadTarget', 'addObstacle'])
    assert.deepEqual(template.blocks[2]?.messages[3]?.visibleWhen, {
      var: 'amuraValid',
      equals: 'לא תקינה',
    })
    assert.deepEqual(template.blocks[3]?.messages[5]?.visibleWhen, {
      var: 'obstacleActive2',
      equals: '1',
    })
  })
})

describe('isNadbarUserVarNumeric', () => {
  it('is true only when template declares numeric input', () => {
    const fields = {
      meraom: { input: 'numeric' as const },
      metara: { input: 'numeric' as const },
    }
    assert.equal(isNadbarUserVarNumeric(fields, 'meraom'), true)
    assert.equal(isNadbarUserVarNumeric(fields, 'metara'), true)
    assert.equal(isNadbarUserVarNumeric(fields, 'kutz'), false)
    assert.equal(isNadbarUserVarNumeric(undefined, 'meraom'), false)
  })
})

describe('isNadbarUserVarChoice', () => {
  it('is true only when template declares choice input', () => {
    const fields = {
      amuraValid: { input: 'choice' as const, options: ['תקינה', 'לא תקינה'] as const },
      meraom: { input: 'numeric' as const },
    }
    assert.equal(isNadbarUserVarChoice(fields, 'amuraValid'), true)
    assert.equal(isNadbarUserVarChoice(fields, 'meraom'), false)
    assert.equal(isNadbarUserVarChoice(undefined, 'amuraValid'), false)
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

  it('rejects legacy flat messageVars', () => {
    const nadbar = createNadbarFromTemplate(
      'Katmam',
      blocksFromMessages([{ source: 'Me', content: 'בדיקה' }]),
    )
    assert.equal(
      isValidNadbar({ ...nadbar, messageVars: { metara: 'legacy' } }),
      false,
    )
  })

  it('rejects blockMessageVars length mismatch', () => {
    const nadbar = createNadbarFromTemplate(
      'Katmam',
      blocksFromMessages([{ source: 'Me', content: 'בדיקה' }]),
    )
    assert.equal(isValidNadbar({ ...nadbar, blockMessageVars: [{}, {}] }), false)
  })
})
