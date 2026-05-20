import FormField from './FormField'
import Input from './Input'

function FireFeasibilityCoordsForm() {
  return (
    <div className="flex flex-col gap-4">
      <FormField label="שם עמדה">
        <Input type="text" placeholder="מטולה" />
      </FormField>

      <FormField label='נ"צ עמדה'>
        <Input type="text" placeholder="627850/465980" />
      </FormField>

      <FormField label="גובה עמדה">
        <Input type="number" placeholder="321" />
      </FormField>

      <FormField label="מספר מטרה">
        <Input type="text" placeholder="T2301" />
      </FormField>

      <FormField label='נ"צ מטרה'>
        <Input type="text" placeholder="620365/456987" />
      </FormField>

      <FormField label="גובה">
        <Input type="number" placeholder="321" />
      </FormField>

      <FormField label='נ"צ מכשול'>
        <Input type="text" />
      </FormField>

      <FormField label="גובה מכשול">
        <Input type="number" />
      </FormField>

      <FormField label='נ"צ הסתר 1'>
        <Input type="text" />
      </FormField>

      <FormField label="גובה הסתר 1">
        <Input type="number" />
      </FormField>

      <FormField label='נ"צ הסתר 2'>
        <Input type="text" />
      </FormField>

      <FormField label="גובה הסתר 2">
        <Input type="number" />
      </FormField>

      <FormField label="גובה עננים מעל פני הים">
        <Input type="number" />
      </FormField>

      <FormField label="מסלול מעוף">
        <Input type="text" />
      </FormField>
    </div>
  )
}

export default FireFeasibilityCoordsForm
