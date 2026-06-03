import assert from 'node:assert/strict'
import { describe, it } from 'node:test'
import { createNadbarFromTemplate } from '../domain/nadbar'
import { getNadbarTemplate } from '../domain/nadbarTemplates'
import { applyNadbarBlockUserVarChange } from './useNadbarBlockUserVarChange'

const pointerTeamBlockFooterActions = getNadbarTemplate('PointerTeam').blocks.map(
  (block) => block.footerActions,
)

describe('applyNadbarBlockUserVarChange load-only guard', () => {
  it('ignores manual edits to target-derived vars on loadTarget blocks', () => {
    const template = getNadbarTemplate('PointerTeam')
    const nadbar = createNadbarFromTemplate('PointerTeam', template)
    const updated = applyNadbarBlockUserVarChange(
      nadbar,
      2,
      'metara',
      'הקלדה ידנית',
      pointerTeamBlockFooterActions,
    )
    assert.equal(updated.blockMessageVars?.[2]?.metara, undefined)
  })

  it('still applies edits to non-target vars on loadTarget blocks', () => {
    const template = getNadbarTemplate('PointerTeam')
    const nadbar = createNadbarFromTemplate('PointerTeam', template)
    const updated = applyNadbarBlockUserVarChange(
      nadbar,
      2,
      'amuraValid',
      'תקינה',
      pointerTeamBlockFooterActions,
    )
    assert.equal(updated.blockMessageVars?.[2]?.amuraValid, 'תקינה')
  })
})

describe('applyNadbarBlockUserVarChange manual target propagation', () => {
  it('does not propagate target-derived vars while typing in createTargetFromVars block', () => {
    const template = getNadbarTemplate('PointerTeam')
    const nadbar = createNadbarFromTemplate('PointerTeam', template)
    const updated = applyNadbarBlockUserVarChange(
      nadbar,
      1,
      'metara',
      'מטרה-7',
      pointerTeamBlockFooterActions,
    )

    assert.equal(updated.blockMessageVars?.[1]?.metara, 'מטרה-7')
    assert.equal(updated.blockMessageVars?.[2]?.metara, undefined)
    assert.equal(updated.blockMessageVars?.[5]?.metara, undefined)
  })
})
