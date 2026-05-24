import { useFormContext } from 'react-hook-form'
import Input from './Input'
import PlusNLabel from './base/PlusNLabel'
import { degreeOpts } from './positionForm.schema'
import type { PositionFormValues } from './positionForm.schema'

type SectorErrors = {
  right?: { compass?: { message?: string }; target?: { message?: string } }
  left?: { compass?: { message?: string }; target?: { message?: string } }
}

interface SectorCardProps {
  title: string
  fieldPrefix: 'primarySector' | 'secondarySector'
}

function SectorCard({ title, fieldPrefix }: SectorCardProps) {
  const { register, formState: { errors } } = useFormContext<PositionFormValues>()
  const sectorErrors = (errors[fieldPrefix] ?? {}) as SectorErrors

  const errorMessage =
    sectorErrors?.right?.compass?.message ||
    sectorErrors?.right?.target?.message ||
    sectorErrors?.left?.compass?.message ||
    sectorErrors?.left?.target?.message

  return (
    <div className="flex flex-col gap-2">
      <h3 className="text-sm font-bold text-neutral-800">{title}</h3>
      <div className="bg-neutral-200 rounded-2xl p-3">
        <div
          className="grid gap-x-2 gap-y-2.5 items-center"
          style={{ gridTemplateColumns: 'auto 1fr 1fr auto' }}
        >
          <div />
          <div className="text-center text-xs font-bold text-neutral-600">גבול ימין</div>
          <div className="text-center text-xs font-bold text-neutral-600">גבול שמאל</div>
          <div />

          <span className="text-sm font-medium text-neutral-700">מצפן</span>
          <Input
            type="number" min={0} max={359.9} step={0.1}
            hasError={!!sectorErrors?.right?.compass}
            {...register(`${fieldPrefix}.right.compass`, degreeOpts)}
          />
          <Input
            type="number" min={0} max={359.9} step={0.1}
            hasError={!!sectorErrors?.left?.compass}
            {...register(`${fieldPrefix}.left.compass`, degreeOpts)}
          />
          <div />

          <span className="text-sm font-medium text-neutral-700">טאצטר</span>
          <Input
            type="number" min={0} max={359.9} step={0.1}
            hasError={!!sectorErrors?.right?.target}
            {...register(`${fieldPrefix}.right.target`, degreeOpts)}
          />
          <Input
            type="number" min={0} max={359.9} step={0.1}
            hasError={!!sectorErrors?.left?.target}
            {...register(`${fieldPrefix}.left.target`, degreeOpts)}
          />
          <PlusNLabel n={10} />
        </div>
        {errorMessage && (
          <span className="block mt-2 text-xs text-red-500 pr-1">{errorMessage}</span>
        )}
      </div>
    </div>
  )
}

export default SectorCard
