import assert from 'node:assert/strict'
import { describe, it } from 'node:test'
import { createNadbarFromTemplate } from '../domain/nadbar'
import { getNadbarTemplate } from '../domain/nadbarTemplates'
import { createTargetFromNadbarVarsAndPropagateUseCase } from './createTargetFromNadbarVarsAndPropagate'

describe('createTargetFromNadbarVarsAndPropagateUseCase', () => {
  it('propagates validated block 2 vars to later blocks after save', () => {
    const template = getNadbarTemplate('PointerTeamUpdated')
    const nadbar = createNadbarFromTemplate('PointerTeamUpdated', template)
    const withVars = {
      ...nadbar,
      blockMessageVars: [
        {},
        {
          metara: 'מטרה א',
          meraom: '654321',
          tsepa: '3765432',
          gamal: '512',
        },
        {},
        {},
        {},
        {},
      ],
    }

    const updated = createTargetFromNadbarVarsAndPropagateUseCase(withVars, 1)

    assert.equal(updated.blockMessageVars?.[1]?.metara, 'מטרה א')
    assert.equal(updated.blockMessageVars?.[2]?.metara, 'מטרה א')
    assert.equal(updated.blockMessageVars?.[5]?.metara, 'מטרה א')
    assert.equal(updated.blockMessageVars?.[2]?.meraom, undefined)
  })

  it('throws before propagation when vars are invalid', () => {
    const template = getNadbarTemplate('PointerTeamUpdated')
    const nadbar = createNadbarFromTemplate('PointerTeamUpdated', template)
    const withInvalid = {
      ...nadbar,
      blockMessageVars: [{}, { metara: 'מטרה א', meraom: '12345' }, {}, {}, {}, {}],
    }

    assert.throws(
      () => createTargetFromNadbarVarsAndPropagateUseCase(withInvalid, 1),
      /מזרחי/,
    )
    assert.equal(withInvalid.blockMessageVars?.[2]?.metara, undefined)
  })
})
