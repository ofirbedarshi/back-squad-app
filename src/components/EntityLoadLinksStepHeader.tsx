import type { EntityLoadLinksStepHeaderConfig } from '../domain/entityLinks.types'

interface EntityLoadLinksStepHeaderProps extends EntityLoadLinksStepHeaderConfig {}

function EntityLoadLinksStepHeader({ stepLabel, title, subtitle }: EntityLoadLinksStepHeaderProps) {
  return (
    <header className="shrink-0 px-3 pb-0.5 pt-2 text-center">
      {stepLabel ? <p className="text-[11px] font-bold text-blue-600">{stepLabel}</p> : null}
      <h1 className="mt-0.5 text-lg font-bold leading-tight text-neutral-800">{title}</h1>
      {subtitle ? <p className="mt-0.5 truncate text-xs text-neutral-500">{subtitle}</p> : null}
    </header>
  )
}

export default EntityLoadLinksStepHeader
