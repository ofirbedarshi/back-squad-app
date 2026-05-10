import { useMemo, useState } from 'react'
import DocFeedbackModal from '../components/base/DocFeedbackModal'
import UnitConversionCard from '../components/UnitConversionCard'
import {
  convertDegreesInputToMilsDisplay,
  convertFeetInputToMetersDisplay,
  convertMetersInputToFeetDisplay,
  convertMilsInputToDegreesDisplay,
} from '../useCases/convertUnitsFromInput'
import unitConversionDocMarkdown from '../../docs/המרת-יחידות.md?raw'

function UnitConversionCalculatorScreen() {
  const [anglesInput, setAnglesInput] = useState('')
  const [anglesReversed, setAnglesReversed] = useState(false)

  const [distanceInput, setDistanceInput] = useState('')
  const [distanceReversed, setDistanceReversed] = useState(false)

  const anglesDisplay = useMemo(
    () =>
      anglesReversed
        ? convertMilsInputToDegreesDisplay(anglesInput)
        : convertDegreesInputToMilsDisplay(anglesInput),
    [anglesInput, anglesReversed]
  )

  const distanceDisplay = useMemo(
    () =>
      distanceReversed
        ? convertFeetInputToMetersDisplay(distanceInput)
        : convertMetersInputToFeetDisplay(distanceInput),
    [distanceInput, distanceReversed]
  )

  return (
    <div dir="rtl" className="relative flex flex-col h-full overflow-y-auto bg-neutral-50">
      <header className="py-4 px-4 text-center font-bold text-lg border-b border-neutral-200 text-neutral-800 shrink-0">
        המרת יחידות
      </header>

      <div className="flex flex-col gap-4 p-4">
        <UnitConversionCard
          categoryTitle="זוויות"
          inputUnitLabel={anglesReversed ? 'אלפיות' : 'מעלות'}
          outputUnitLabel={anglesReversed ? 'מעלות' : 'אלפיות'}
          inputPlaceholder={anglesReversed ? 'אלפיות' : 'מעלות'}
          resultLabel={anglesReversed ? 'מעלות' : 'אלפיות'}
          inputValue={anglesInput}
          onInputChange={setAnglesInput}
          resultValueDisplay={anglesDisplay}
          onToggleDirection={() => setAnglesReversed((v) => !v)}
        />

        <UnitConversionCard
          categoryTitle="מרחקים"
          inputUnitLabel={distanceReversed ? 'רגל' : 'מטר'}
          outputUnitLabel={distanceReversed ? 'מטר' : 'רגל'}
          inputPlaceholder={distanceReversed ? 'רגל' : 'מטר'}
          resultLabel={distanceReversed ? 'מטר' : 'רגל'}
          inputValue={distanceInput}
          onInputChange={setDistanceInput}
          resultValueDisplay={distanceDisplay}
          onToggleDirection={() => setDistanceReversed((v) => !v)}
        />
      </div>

      <DocFeedbackModal
        markdown={unitConversionDocMarkdown}
        modalTitle="מידע על המרת יחידות"
        shareTitle="המרת יחידות"
        openButtonAriaLabel="פתח מידע על המסך"
      />
    </div>
  )
}

export default UnitConversionCalculatorScreen
