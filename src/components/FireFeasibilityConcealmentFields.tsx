import { useState } from 'react'
import FormField from './FormField'
import Input from './Input'

function FireFeasibilityConcealmentFields() {
  const [hide1Distance, setHide1Distance] = useState('')
  const [hide1HeightDiff, setHide1HeightDiff] = useState('')
  const [hide2Distance, setHide2Distance] = useState('')
  const [hide2HeightDiff, setHide2HeightDiff] = useState('')

  return (
    <>
      <FormField label="מרחק הסתר מטרה-1">
        <Input
          type="number"
          value={hide1Distance}
          onChange={(e) => setHide1Distance(e.target.value)}
        />
      </FormField>

      <FormField label="הפרש גובה הסתר מטרה-1">
        <Input
          type="number"
          value={hide1HeightDiff}
          onChange={(e) => setHide1HeightDiff(e.target.value)}
        />
      </FormField>

      <FormField label="מרחק הסתר מטרה-2">
        <Input
          type="number"
          value={hide2Distance}
          onChange={(e) => setHide2Distance(e.target.value)}
        />
      </FormField>

      <FormField label="הפרש גובה הסתר מטרה-2">
        <Input
          type="number"
          value={hide2HeightDiff}
          onChange={(e) => setHide2HeightDiff(e.target.value)}
        />
      </FormField>
    </>
  )
}

export default FireFeasibilityConcealmentFields
