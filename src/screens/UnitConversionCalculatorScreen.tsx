import { useMemo, useState } from 'react'
import UnitConversionCard from '../components/UnitConversionCard'
import UnitConversionUtmCard from '../components/UnitConversionUtmCard'
import {
  convertDegreesInputToMilsDisplay,
  convertFeetInputToMetersDisplay,
  convertMetersInputToFeetDisplay,
  convertMilsInputToDegreesDisplay,
} from '../useCases/convertUnitsFromInput'
import {
  convertLatLngToUtmDisplay,
  convertUtmToLatLngDisplay,
  utmConversionResultToView,
} from '../useCases/convertUtmFromInput'

function UnitConversionCalculatorScreen() {
  const [anglesInput, setAnglesInput] = useState('')
  const [anglesReversed, setAnglesReversed] = useState(false)

  const [distanceInput, setDistanceInput] = useState('')
  const [distanceReversed, setDistanceReversed] = useState(false)

  const [coordsReversed, setCoordsReversed] = useState(false)
  const [easting, setEasting] = useState('')
  const [northing, setNorthing] = useState('')
  const [latitude, setLatitude] = useState('')
  const [longitude, setLongitude] = useState('')
  const [zone, setZone] = useState('36')

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

  const coordsResultView = useMemo(() => {
    const result = coordsReversed
      ? convertLatLngToUtmDisplay({ latitude, longitude, zone })
      : convertUtmToLatLngDisplay({ easting, northing, zone })
    return utmConversionResultToView(result)
  }, [coordsReversed, easting, northing, latitude, longitude, zone])

  return (
    <div dir="rtl" className="flex flex-col h-full overflow-y-auto bg-neutral-50">
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

        <UnitConversionUtmCard
          reversed={coordsReversed}
          easting={easting}
          northing={northing}
          latitude={latitude}
          longitude={longitude}
          zone={zone}
          resultView={coordsResultView}
          onToggleDirection={() => setCoordsReversed((v) => !v)}
          onEastingChange={setEasting}
          onNorthingChange={setNorthing}
          onLatitudeChange={setLatitude}
          onLongitudeChange={setLongitude}
          onZoneChange={setZone}
        />
      </div>
    </div>
  )
}

export default UnitConversionCalculatorScreen
