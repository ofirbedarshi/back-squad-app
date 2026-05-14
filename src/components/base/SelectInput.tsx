import { forwardRef } from 'react'
import type { SelectInputProps } from './selectInput.types'

const SelectInput = forwardRef<HTMLSelectElement, SelectInputProps>(
  ({ options, hasError = false, placeholder, disabled = false, className, ...props }, ref) => {
    return (
      <div className="relative">
        <select
          ref={ref}
          disabled={disabled}
          aria-invalid={hasError || undefined}
          className={[
            'w-full min-h-14 appearance-none rounded-2xl border py-3.5 pl-12 pr-4 text-right text-base font-medium outline-none shadow-sm transition-all touch-manipulation',
            disabled
              ? 'cursor-not-allowed border-neutral-200 bg-neutral-100 text-neutral-400 opacity-60'
              : hasError
                ? 'border-red-400 bg-red-50 text-neutral-800 focus:border-red-400 focus:ring-2 focus:ring-red-400/20'
                : 'border-neutral-200 bg-neutral-50 text-neutral-800 focus:border-blue-400 focus:bg-white focus:ring-2 focus:ring-blue-400/20',
            className,
          ]
            .filter(Boolean)
            .join(' ')}
          dir="rtl"
          {...props}
        >
          {placeholder && (
            <option value="" disabled>
              {placeholder}
            </option>
          )}
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>

        <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-neutral-400">
          <svg width="18" height="18" viewBox="0 0 20 20" fill="none" aria-hidden="true">
            <path
              d="M5 7.5L10 12.5L15 7.5"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </span>
      </div>
    )
  }
)

SelectInput.displayName = 'SelectInput'

export default SelectInput
