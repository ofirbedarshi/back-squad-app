import assert from 'node:assert/strict'
import { describe, it } from 'node:test'
import { createNadbarFromTemplate } from '../domain/nadbar.ts'
import { getNadbarTemplate } from '../domain/nadbarTemplates.ts'
import type { Target } from '../domain/target.types.ts'
import { getNadbarChatTemplateUseCase } from './getNadbarChatTemplate.ts'
import {
  applyTargetToNadbarGloballyUseCase,
  clearTargetFromNadbarGloballyUseCase,
} from './applyTargetToNadbarGlobally.ts'

const sampleTarget: Target = {
  id: 'target-1',
  updatedAt: '2026-01-01T00:00:00.000Z',
  targetName: 'מטרה א',
  coordinates: { east: '654321', north: '3765432', palach: '36' },
  altitude: 512,
}

describe('applyTargetToNadbarGloballyUseCase', () => {
  it('applies one target across all blocks including block 2 (מטרה)', () => {
    const template = getNadbarTemplate('PointerTeam')
    const nadbar = createNadbarFromTemplate('PointerTeam', template)
    const blockFooterActions = getNadbarChatTemplateUseCase('PointerTeam').blockFooterActions

    const { nadbar: updated } = applyTargetToNadbarGloballyUseCase(
      nadbar,
      sampleTarget,
      blockFooterActions,
    )

    assert.equal(updated.blockMessageVars?.[1]?.metara, 'מטרה א')
    assert.equal(updated.blockMessageVars?.[1]?.meraom, '654321')
    assert.equal(updated.blockMessageVars?.[2]?.metara, 'מטרה א')
    assert.equal(updated.blockMessageVars?.[5]?.metara, 'מטרה א')
  })

  it('throws when template has no loadTarget blocks', () => {
    const template = getNadbarTemplate('Katmam')
    const nadbar = createNadbarFromTemplate('Katmam', template)

    assert.throws(
      () =>
        applyTargetToNadbarGloballyUseCase(nadbar, sampleTarget, [
          undefined,
        ]),
      /תבנית הנדבר אינה תומכת בטעינת מטרה/,
    )
  })
})

describe('clearTargetFromNadbarGloballyUseCase', () => {
  it('clears target-derived vars from all blocks', () => {
    const template = getNadbarTemplate('PointerTeam')
    const nadbar = createNadbarFromTemplate('PointerTeam', template)
    const blockFooterActions = getNadbarChatTemplateUseCase('PointerTeam').blockFooterActions
    const { nadbar: withTarget } = applyTargetToNadbarGloballyUseCase(
      nadbar,
      sampleTarget,
      blockFooterActions,
    )

    const cleared = clearTargetFromNadbarGloballyUseCase(withTarget, blockFooterActions)

    assert.equal(cleared.blockMessageVars?.[1]?.metara, undefined)
    assert.equal(cleared.blockMessageVars?.[2]?.metara, undefined)
    assert.equal(cleared.blockMessageVars?.[5]?.metara, undefined)
  })
})
