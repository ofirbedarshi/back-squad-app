import { useCallback, useRef } from 'react'

const LONG_PRESS_DELAY_MS = 500

interface LongPressHandlers {
  onTouchStart: (e: React.TouchEvent) => void
  onTouchEnd: () => void
  onTouchMove: () => void
  onMouseDown: (e: React.MouseEvent) => void
  onMouseUp: () => void
  onMouseLeave: () => void
  onClick: (e: React.MouseEvent | React.TouchEvent) => void
}

/**
 * Returns event handlers that distinguish a long press from a short tap.
 * `onLongPress` fires after LONG_PRESS_DELAY_MS; `onPress` fires on short tap.
 */
export function useLongPress(onLongPress: () => void, onPress?: () => void): LongPressHandlers {
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const longPressTriggeredRef = useRef(false)

  const start = useCallback(() => {
    longPressTriggeredRef.current = false
    timerRef.current = setTimeout(() => {
      longPressTriggeredRef.current = true
      navigator.vibrate?.(50)
      onLongPress()
    }, LONG_PRESS_DELAY_MS)
  }, [onLongPress])

  const cancel = useCallback(() => {
    if (timerRef.current) {
      clearTimeout(timerRef.current)
      timerRef.current = null
    }
  }, [])

  const handleClick = useCallback(
    (e: React.MouseEvent | React.TouchEvent) => {
      if (longPressTriggeredRef.current) {
        e.preventDefault()
        return
      }
      onPress?.()
    },
    [onPress],
  )

  return {
    onTouchStart: (e) => {
      e.stopPropagation()
      start()
    },
    onTouchEnd: cancel,
    onTouchMove: cancel,
    onMouseDown: (e) => {
      e.stopPropagation()
      start()
    },
    onMouseUp: cancel,
    onMouseLeave: cancel,
    onClick: handleClick,
  }
}
