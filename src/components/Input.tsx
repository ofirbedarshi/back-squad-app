import { forwardRef } from 'react'
import InputMultiline from './InputMultiline'
import { inputFieldClassName } from './inputFieldClassName'
import { inputUsesMultiline } from './inputUsesMultiline'

type InputFieldProps = {
  hasError?: boolean
  hasWarning?: boolean
  /** Defaults to true. Use false for a single-line field. Number/date/time always use native input. */
  multiline?: boolean
}

export type InputProps = InputFieldProps &
  (React.InputHTMLAttributes<HTMLInputElement> & React.TextareaHTMLAttributes<HTMLTextAreaElement>)

const Input = forwardRef<HTMLInputElement | HTMLTextAreaElement, InputProps>(
  (props, ref) => {
    const { hasError, hasWarning, multiline, className, type, ...rest } = props

    if (inputUsesMultiline(multiline, type)) {
      return (
        <InputMultiline
          ref={ref as React.ForwardedRef<HTMLTextAreaElement>}
          hasError={hasError}
          hasWarning={hasWarning}
          className={className}
          {...rest}
        />
      )
    }

    const numberWheelGuard =
      type === 'number'
        ? (event: React.WheelEvent<HTMLInputElement>) => event.currentTarget.blur()
        : undefined

    return (
      <input
        ref={ref as React.ForwardedRef<HTMLInputElement>}
        type={type}
        onWheel={numberWheelGuard}
        {...rest}
        className={inputFieldClassName(hasError ?? false, hasWarning ?? false, false, className)}
      />
    )
  },
)

Input.displayName = 'Input'

export default Input
