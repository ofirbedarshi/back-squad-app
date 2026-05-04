import { forwardRef } from 'react'

interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {
  hasError?: boolean
}

const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ hasError = false, ...props }, ref) => {
    return (
      <input
        ref={ref}
        {...props}
        className={[
          'w-full py-3.5 px-4 rounded-2xl border text-base text-neutral-800 placeholder-neutral-400 outline-none shadow-sm transition-all',
          hasError
            ? 'border-red-400 bg-red-50 focus:border-red-400 focus:ring-2 focus:ring-red-400/20'
            : 'border-neutral-200 bg-neutral-50 focus:border-blue-400 focus:bg-white focus:ring-2 focus:ring-blue-400/20',
        ].join(' ')}
      />
    )
  }
)

Input.displayName = 'Input'

export default Input
