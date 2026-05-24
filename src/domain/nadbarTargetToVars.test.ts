import assert from 'node:assert/strict'
import { describe, it } from 'node:test'
import { getNadbarTemplate } from './nadbarTemplates.ts'
import { createNadbarFromTemplate } from './nadbar.ts'
import {
  applyTargetToNadbarBlock,
  buildBlockMessageVarsFromTarget,
  clearTargetDerivedBlockVars,
  collectBlockUserVarNames,
  isNadbarTargetDerivedVarName,
  resolveNadbarVarFromTarget,
} from './nadbarTargetToVars.ts'
import type { Target } from './target.types.ts'

const sampleTarget: Target = {
  id: 'target-1',
  updatedAt: '2026-01-01T00:00:00.000Z',
  targetName: 'מטרה א',
  coordinates: { east: '654321', north: '3765432', palach: '36' },
  altitude: 512,
}

describe('resolveNadbarVarFromTarget', () => {
  it('maps known var names from target fields', () => {
    assert.equal(resolveNadbarVarFromTarget('metara', sampleTarget), 'מטרה א')
    assert.equal(resolveNadbarVarFromTarget('meraom', sampleTarget), '654321')
    assert.equal(resolveNadbarVarFromTarget('tsepa', sampleTarget), '3765432')
    assert.equal(resolveNadbarVarFromTarget('gamal', sampleTarget), '512')
    assert.equal(resolveNadbarVarFromTarget('amura', sampleTarget, 127.4), '127')
  })

  it('returns undefined for unknown var names', () => {
    assert.equal(resolveNadbarVarFromTarget('amuraValid', sampleTarget), undefined)
  })
})

describe('buildBlockMessageVarsFromTarget', () => {
  it('fills only vars used in the block messages', () => {
    const template = getNadbarTemplate('PointerTeamUpdated')
    const block3 = template.blocks[2]!
    const vars = buildBlockMessageVarsFromTarget(block3, sampleTarget, 90)

    assert.equal(vars.metara, 'מטרה א')
    assert.equal(vars.amura, '90')
    assert.equal(vars.meraom, undefined)
    assert.equal(vars.tsepa, undefined)
    assert.equal(vars.gamal, undefined)
    assert.equal(vars.amuraValid, undefined)
  })

  it('fills coordinate vars for block 2', () => {
    const template = getNadbarTemplate('PointerTeamUpdated')
    const block2 = template.blocks[1]!
    const vars = buildBlockMessageVarsFromTarget(block2, sampleTarget)

    assert.equal(vars.metara, 'מטרה א')
    assert.equal(vars.meraom, '654321')
    assert.equal(vars.tsepa, '3765432')
    assert.equal(vars.gamal, '512')
    assert.equal(vars.amura, undefined)
  })
})

describe('applyTargetToNadbarBlock', () => {
  it('updates only the requested block', () => {
    const template = getNadbarTemplate('PointerTeamUpdated')
    const nadbar = createNadbarFromTemplate('PointerTeamUpdated', template)
    const withBlock2 = applyTargetToNadbarBlock(nadbar, 1, sampleTarget)
    const updated = applyTargetToNadbarBlock(withBlock2, 2, sampleTarget, 180)

    assert.equal(updated.blockMessageVars?.[1]?.metara, 'מטרה א')
    assert.equal(updated.blockMessageVars?.[2]?.metara, 'מטרה א')
    assert.equal(updated.blockMessageVars?.[2]?.amura, '180')
    assert.equal(updated.blockMessageVars?.[0]?.metara, undefined)
  })
})

describe('clearTargetDerivedBlockVars', () => {
  it('removes target-derived vars but keeps manual workflow vars', () => {
    const template = getNadbarTemplate('PointerTeamUpdated')
    const block3 = template.blocks[2]!
    let nadbar = createNadbarFromTemplate('PointerTeamUpdated', template)
    nadbar = applyTargetToNadbarBlock(nadbar, 2, sampleTarget, 180)
    nadbar = {
      ...nadbar,
      blockMessageVars: [
        ...(nadbar.blockMessageVars ?? []),
      ],
    }
    const blockVars = { ...(nadbar.blockMessageVars?.[2] ?? {}), amuraValid: 'תקינה' }
    nadbar = {
      ...nadbar,
      blockMessageVars: [
        nadbar.blockMessageVars?.[0] ?? {},
        nadbar.blockMessageVars?.[1] ?? {},
        blockVars,
      ],
    }

    const cleared = clearTargetDerivedBlockVars(nadbar, 2, block3)

    assert.equal(cleared.blockMessageVars?.[2]?.metara, undefined)
    assert.equal(cleared.blockMessageVars?.[2]?.amura, undefined)
    assert.equal(cleared.blockMessageVars?.[2]?.amuraValid, 'תקינה')
  })
})

describe('collectBlockUserVarNames', () => {
  it('collects unique var names from block messages', () => {
    const template = getNadbarTemplate('PointerTeamUpdated')
    const names = collectBlockUserVarNames(template.blocks[2]!)

    assert.ok(names.includes('metara'))
    assert.ok(names.includes('amura'))
    assert.ok(names.includes('amuraValid'))
    assert.ok(names.includes('amuraCorrected'))
  })
})

describe('isNadbarTargetDerivedVarName', () => {
  it('identifies target-derived vars', () => {
    assert.equal(isNadbarTargetDerivedVarName('metara'), true)
    assert.equal(isNadbarTargetDerivedVarName('amuraValid'), false)
  })
})
