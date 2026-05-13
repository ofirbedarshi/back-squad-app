import { useFormContext } from 'react-hook-form'
import Input from './Input'
import PlusNButton from './base/PlusNButton'
import { degreeOpts } from './positionForm.schema'
import type { PositionFormValues } from './positionForm.schema'
import { usePlusN } from '../hooks/usePlusN'

type ObstacleErrors = Array<
  { compass?: { message?: string }; target?: { message?: string } } | undefined
>

function ObstaclesCard() {
  const { register, formState: { errors } } = useFormContext<PositionFormValues>()
  const obstacleErrors = (errors.obstacles ?? []) as unknown as ObstacleErrors

  const plusFive0 = usePlusN('obstacles.0.target', 5)
  const plusFive1 = usePlusN('obstacles.1.target', 5)
  const plusFive2 = usePlusN('obstacles.2.target', 5)
  const plusFive = [plusFive0, plusFive1, plusFive2] as const

  const errorMessage = obstacleErrors
    ?.flatMap((e) => [e?.compass?.message, e?.target?.message])
    .find(Boolean)

  return (
    <div className="flex flex-col gap-2">
      <h3 className="text-sm font-bold text-neutral-800">מכשולים לבדיקה:</h3>
      <div className="bg-neutral-200 rounded-2xl p-3">
        <div
          className="grid gap-x-2 gap-y-2.5 items-center"
          style={{ gridTemplateColumns: 'auto 1fr 1fr auto' }}
        >
          <div />
          <div className="text-center text-xs font-bold text-neutral-600">מצפן</div>
          <div className="text-center text-xs font-bold text-neutral-600">טאצטר</div>
          <div />

          {([0, 1, 2] as const).map((i) => (
            <>
              <span key={`label-${i}`} className="text-sm font-medium text-neutral-700 text-start">
                .{i + 1}
              </span>
              <Input
                key={`compass-${i}`}
                type="number" min={0} max={359.9} step={0.1}
                hasError={!!obstacleErrors?.[i]?.compass}
                {...register(`obstacles.${i}.compass`, degreeOpts)}
              />
              <Input
                key={`target-${i}`}
                type="number" min={0} max={359.9} step={0.1}
                hasError={!!obstacleErrors?.[i]?.target}
                {...register(`obstacles.${i}.target`, plusFive[i].registerOptions)}
              />
              <PlusNButton
                key={`plus-${i}`}
                n={5}
                isApplied={plusFive[i].applied}
                onApply={plusFive[i].apply}
              />
            </>
          ))}
        </div>
        {errorMessage && (
          <span className="block mt-2 text-xs text-red-500 pr-1">{errorMessage}</span>
        )}
      </div>
    </div>
  )
}

export default ObstaclesCard
