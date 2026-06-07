import InfoTooltip from './base/InfoTooltip'
import type { FormFieldProps } from './formField.types'

function FormField({ label, error, children, infoTooltipText, headerAction }: FormFieldProps) {
  return (
    <div className="flex flex-col gap-1.5">
      <div className={`flex items-center gap-2 pr-1 ${headerAction ? 'justify-between' : ''}`}>
        <span className="text-sm text-neutral-500 inline-flex items-center gap-2">
          {label}
          {infoTooltipText && <InfoTooltip text={infoTooltipText} />}
        </span>
        {headerAction}
      </div>
      {children}
      {error && (
        <span className="text-xs text-red-500 pr-1">{error}</span>
      )}
    </div>
  )
}

export default FormField
