import { forwardRef } from 'react'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  hasError?: boolean
  hasWarning?: boolean
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ hasError = false, hasWarning = false, ...props }, ref) => {
    return (
      <input
        ref={ref}
        {...props}
        className={[
          'w-full py-3.5 px-4 rounded-2xl border text-base placeholder-neutral-400 outline-none shadow-sm transition-all disabled:opacity-60 disabled:cursor-not-allowed disabled:bg-neutral-100',
          hasError
            ? 'border-red-400 bg-red-50 text-neutral-800 focus:border-red-400 focus:ring-2 focus:ring-red-400/20'
            : hasWarning
              ? 'border-orange-400 bg-orange-50 text-orange-600 focus:border-orange-400 focus:ring-2 focus:ring-orange-400/20'
              : 'border-neutral-200 bg-neutral-50 text-neutral-800 focus:border-blue-400 focus:bg-white focus:ring-2 focus:ring-blue-400/20',
        ].join(' ')}
      />
    )
  }
)

Input.displayName = 'Input'

export default Input
