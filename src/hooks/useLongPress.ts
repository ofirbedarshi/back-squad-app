import { useCallback, useRef } from 'react'
import { clearDomTextSelection } from '../utils/clearDomTextSelection'

const LONG_PRESS_DELAY_MS = 500

interface LongPressHandlers {
  onTouchStart: (e: React.TouchEvent) => void
  onTouchEnd: (e: React.TouchEvent) => void
  onTouchMove: (e: React.TouchEvent) => void
  onMouseDown: (e: React.MouseEvent) => void
  onMouseUp: () => void
  onMouseLeave: () => void
  onClick: (e: React.MouseEvent | React.TouchEvent) => void
  onContextMenu: (e: React.MouseEvent) => void
}

/**
 * Returns event handlers that distinguish a long press from a short tap.
 * `onLongPress` fires after LONG_PRESS_DELAY_MS; `onPress` fires on short tap.
 */
export function useLongPress(onLongPress: () => void, onPress?: () => void): LongPressHandlers {
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)
  const longPressTriggeredRef = useRef(false)
  const touchMovedRef = useRef(false)
  const ignoreNextClickRef = useRef(false)

  const start = useCallback(() => {
    longPressTriggeredRef.current = false
    touchMovedRef.current = false
    timerRef.current = setTimeout(() => {
      longPressTriggeredRef.current = true
      navigator.vibrate?.(50)
      clearDomTextSelection()
      onLongPress()
      queueMicrotask(clearDomTextSelection)
      requestAnimationFrame(clearDomTextSelection)
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
      if (ignoreNextClickRef.current) {
        e.preventDefault()
        ignoreNextClickRef.current = false
        return
      }
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
      e.preventDefault()
      start()
    },
    onTouchEnd: (e) => {
      e.stopPropagation()
      e.preventDefault()
      const wasLongPress = longPressTriggeredRef.current
      const wasMoved = touchMovedRef.current
      cancel()
      ignoreNextClickRef.current = true
      if (!wasLongPress && !wasMoved) {
        onPress?.()
      }
    },
    onTouchMove: (e) => {
      e.stopPropagation()
      touchMovedRef.current = true
      cancel()
    },
    onMouseDown: (e) => {
      e.stopPropagation()
      start()
    },
    onMouseUp: cancel,
    onMouseLeave: cancel,
    onClick: handleClick,
    onContextMenu: (e) => e.preventDefault(),
  }
}
