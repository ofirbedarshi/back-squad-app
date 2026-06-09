import assert from 'node:assert/strict'
import { describe, it } from 'node:test'
import { createNadbarFromTemplate } from '../domain/nadbar.ts'
import { getNadbarTemplate } from '../domain/nadbarTemplates.ts'
import { getNadbarGlobalTargetChangeResetBlockIndices } from '../domain/nadbarTargetToVars.ts'
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

const otherTarget: Target = {
  id: 'target-2',
  updatedAt: '2026-01-01T00:00:00.000Z',
  targetName: 'מטרה ב',
  coordinates: { east: '111111', north: '2222222', palach: '36' },
  altitude: 300,
}

describe('getNadbarGlobalTargetChangeResetBlockIndices', () => {
  it('returns amura and obstacles blocks for Pointer Team', () => {
    const template = getNadbarTemplate('PointerTeam')
    const nadbar = createNadbarFromTemplate('PointerTeam', template)
    const blockFooterActions = getNadbarChatTemplateUseCase('PointerTeam').blockFooterActions

    assert.deepEqual(getNadbarGlobalTargetChangeResetBlockIndices(nadbar, blockFooterActions), [2, 3])
  })
})

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

  it('clears amura and obstacle answers when loading a different target', () => {
    const template = getNadbarTemplate('PointerTeam')
    const blockFooterActions = getNadbarChatTemplateUseCase('PointerTeam').blockFooterActions
    const nadbar = createNadbarFromTemplate('PointerTeam', template)
    const { nadbar: withFirstTarget } = applyTargetToNadbarGloballyUseCase(
      nadbar,
      sampleTarget,
      blockFooterActions,
    )
    const withAnswers = {
      ...withFirstTarget,
      blockMessageVars: withFirstTarget.blockMessageVars?.map((vars, index) => {
        if (index === 2) {
          return { ...vars, amuraValid: 'תקינה', amuraManual: '45' }
        }
        if (index === 3) {
          return {
            ...vars,
            hasNearbyObstacles: 'חיובי',
            obstacleHeight1: '100',
            obstacleDistance1: '500',
          }
        }
        if (index === 4) {
          return { ...vars, hasSpecialRequirements: 'שלילי' }
        }
        return vars
      }),
    }

    const { nadbar: updated } = applyTargetToNadbarGloballyUseCase(
      withAnswers,
      otherTarget,
      blockFooterActions,
    )

    assert.equal(updated.blockMessageVars?.[2]?.amuraValid, undefined)
    assert.equal(updated.blockMessageVars?.[2]?.amuraManual, undefined)
    assert.equal(updated.blockMessageVars?.[2]?.metara, 'מטרה ב')
    assert.equal(updated.blockMessageVars?.[3]?.hasNearbyObstacles, undefined)
    assert.equal(updated.blockMessageVars?.[3]?.obstacleHeight1, undefined)
    assert.equal(updated.blockMessageVars?.[3]?.metara, 'מטרה ב')
    assert.equal(updated.blockMessageVars?.[4]?.hasSpecialRequirements, 'שלילי')
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

  it('clears amura and obstacle answers while leaving later blocks untouched', () => {
    const template = getNadbarTemplate('PointerTeam')
    const blockFooterActions = getNadbarChatTemplateUseCase('PointerTeam').blockFooterActions
    const nadbar = createNadbarFromTemplate('PointerTeam', template)
    const { nadbar: withTarget } = applyTargetToNadbarGloballyUseCase(
      nadbar,
      sampleTarget,
      blockFooterActions,
    )
    const withAnswers = {
      ...withTarget,
      blockMessageVars: withTarget.blockMessageVars?.map((vars, index) => {
        if (index === 2) {
          return { ...vars, amuraValid: 'לא תקינה', amuraCorrected: '120' }
        }
        if (index === 3) {
          return {
            ...vars,
            hasNearbyObstacles: 'חיובי',
            obstacleHeight1: '80',
            obstacleDistance1: '400',
          }
        }
        if (index === 4) {
          return { ...vars, hasSpecialRequirements: 'חיובי', hetSet: 'ימין' }
        }
        return vars
      }),
    }

    const cleared = clearTargetFromNadbarGloballyUseCase(withAnswers, blockFooterActions)

    assert.deepEqual(cleared.blockMessageVars?.[2], {})
    assert.deepEqual(cleared.blockMessageVars?.[3], {})
    assert.equal(cleared.blockMessageVars?.[4]?.hasSpecialRequirements, 'חיובי')
    assert.equal(cleared.blockMessageVars?.[4]?.hetSet, 'ימין')
    assert.equal(cleared.blockMessageVars?.[4]?.metara, undefined)
  })
})
