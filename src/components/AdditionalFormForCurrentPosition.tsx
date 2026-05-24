import { useFormContext, Controller } from 'react-hook-form'
import FormField from './FormField'
import Input from './Input'
import PitchRollInput from './PitchRollInput'
import { pitchRollOpts } from './pitchRollInput.utils'
import SegmentedToggle from './base/SegmentedToggle'
import SectorCard from './SectorCard'
import ObstaclesCard from './ObstaclesCard'
import { LAUNCHER_TYPES, LAUNCHER_OPTIONS } from './positionForm.schema'
import type { PositionFormValues } from './positionForm.schema'

function AdditionalFormForCurrentPosition() {
  const { register, control, watch, formState: { errors } } = useFormContext<PositionFormValues>()
  const isVehicle = watch('launcherType') === LAUNCHER_TYPES.VEHICLE
  const pitch = watch('pitch')
  const roll = watch('roll')

  return (
    <>
      <FormField label='אק"א' error={errors.aka?.message}>
        <Input type="number" hasError={!!errors.aka} {...register('aka', { valueAsNumber: true })} />
      </FormField>

      <FormField label="סוג משגר">
        <Controller
          name="launcherType"
          control={control}
          render={({ field }) => (
            <SegmentedToggle options={LAUNCHER_OPTIONS} value={field.value} onChange={field.onChange} />
          )}
        />
      </FormField>

      {isVehicle && (
        <FormField label="צ׳ רכב" error={errors.vehicleId?.message}>
          <Input type="text" hasError={!!errors.vehicleId} {...register('vehicleId')} />
        </FormField>
      )}

      <div className="flex gap-3">
        <div className="flex-1">
          <PitchRollInput
            label="Pitch"
            error={errors.pitch?.message}
            valueForWarning={pitch}
            {...register('pitch', pitchRollOpts)}
          />
        </div>
        <div className="flex-1">
          <PitchRollInput
            label="Roll"
            error={errors.roll?.message}
            valueForWarning={roll}
            {...register('roll', pitchRollOpts)}
          />
        </div>
      </div>

      <hr className="border-0 border-t border-neutral-200" />

      <SectorCard title="גזרה ראשית:" fieldPrefix="primarySector" />
      <SectorCard title="גזרה משנית:" fieldPrefix="secondarySector" />
      <ObstaclesCard />
    </>
  )
}

export default AdditionalFormForCurrentPosition
