import { useCallback, useLayoutEffect, useRef } from 'react'

/** Matches Tailwind min-w-[2rem] on nadbar inline inputs. */
const INLINE_INPUT_MIN_PX = 32

function adjustInputWidth(el: HTMLInputElement) {
  // Shrink to min before measure — never 0px (breaks controlled input on WebView)
  el.style.width = `${INLINE_INPUT_MIN_PX}px`
  el.style.width = `${Math.max(INLINE_INPUT_MIN_PX, el.scrollWidth)}px`
}

export function useAutoGrowInputWidth(
  forwardedRef: React.ForwardedRef<HTMLInputElement>,
  value: string | number | readonly string[] | undefined,
) {
  const inputRef = useRef<HTMLInputElement | null>(null)

  const syncWidth = useCallback(() => {
    const el = inputRef.current
    if (el) adjustInputWidth(el)
  }, [])

  useLayoutEffect(() => {
    syncWidth()
  }, [syncWidth, value])

  const setRef = useCallback(
    (el: HTMLInputElement | null) => {
      inputRef.current = el
      if (typeof forwardedRef === 'function') forwardedRef(el)
      else if (forwardedRef) forwardedRef.current = el
      if (el) adjustInputWidth(el)
    },
    [forwardedRef],
  )

  const onInput = useCallback((event: React.FormEvent<HTMLInputElement>) => {
    adjustInputWidth(event.currentTarget)
  }, [])

  return { setRef, onInput, syncWidth }
}
