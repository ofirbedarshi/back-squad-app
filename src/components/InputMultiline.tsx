import { forwardRef } from 'react'
import { useAutoGrowTextarea } from '../hooks/useAutoGrowTextarea'
import { inputFieldClassName } from './inputFieldClassName'

type InputMultilineProps = React.TextareaHTMLAttributes<HTMLTextAreaElement> & {
  hasError?: boolean
  hasWarning?: boolean
}

const InputMultiline = forwardRef<HTMLTextAreaElement, InputMultilineProps>(
  (
    {
      hasError = false,
      hasWarning = false,
      className,
      value,
      defaultValue,
      onChange,
      onInput,
      rows = 1,
      ...textareaProps
    },
    ref,
  ) => {
    const { setRef, onInput: onAutoGrowInput, syncHeight } = useAutoGrowTextarea(
      ref,
      value ?? defaultValue,
    )

    return (
      <textarea
        ref={setRef}
        rows={rows}
        value={value}
        defaultValue={defaultValue}
        {...textareaProps}
        onChange={(event) => {
          syncHeight()
          onChange?.(event)
        }}
        onInput={(event) => {
          onAutoGrowInput(event)
          onInput?.(event)
        }}
        className={inputFieldClassName(hasError, hasWarning, true, className)}
      />
    )
  },
)

InputMultiline.displayName = 'InputMultiline'

export default InputMultiline
