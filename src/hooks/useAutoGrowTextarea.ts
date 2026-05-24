import { useCallback, useLayoutEffect, useRef } from 'react'

function adjustTextareaHeight(el: HTMLTextAreaElement) {
  el.style.height = 'auto'
  el.style.height = `${el.scrollHeight}px`
}

export function useAutoGrowTextarea(
  forwardedRef: React.ForwardedRef<HTMLTextAreaElement>,
  value: string | number | readonly string[] | undefined,
) {
  const textareaRef = useRef<HTMLTextAreaElement | null>(null)

  const syncHeight = useCallback(() => {
    const el = textareaRef.current
    if (el) adjustTextareaHeight(el)
  }, [])

  useLayoutEffect(() => {
    syncHeight()
  }, [syncHeight, value])

  const setRef = useCallback(
    (el: HTMLTextAreaElement | null) => {
      textareaRef.current = el
      if (typeof forwardedRef === 'function') forwardedRef(el)
      else if (forwardedRef) forwardedRef.current = el
      if (el) adjustTextareaHeight(el)
    },
    [forwardedRef],
  )

  const onInput = useCallback(
    (event: React.FormEvent<HTMLTextAreaElement>) => {
      adjustTextareaHeight(event.currentTarget)
    },
    [],
  )

  return { setRef, onInput, syncHeight }
}
