import { Fragment } from 'react'
import { useFormContext } from 'react-hook-form'
import Input from './Input'
import PlusNLabel from './base/PlusNLabel'
import { degreeOpts } from './positionForm.schema'
import type { PositionFormValues } from './positionForm.schema'

type ObstacleErrors = Array<
  { compass?: { message?: string }; target?: { message?: string } } | undefined
>

function ObstaclesCard() {
  const { register, formState: { errors } } = useFormContext<PositionFormValues>()
  const obstacleErrors = (errors.obstacles ?? []) as unknown as ObstacleErrors

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
            <Fragment key={i}>
              <span className="text-sm font-medium text-neutral-700 text-start">
                .{i + 1}
              </span>
              <Input
                type="number" min={0} max={359.9} step={0.1}
                hasError={!!obstacleErrors?.[i]?.compass}
                {...register(`obstacles.${i}.compass`, degreeOpts)}
              />
              <Input
                type="number" min={0} max={359.9} step={0.1}
                hasError={!!obstacleErrors?.[i]?.target}
                {...register(`obstacles.${i}.target`, degreeOpts)}
              />
              <PlusNLabel n={5} />
            </Fragment>
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
