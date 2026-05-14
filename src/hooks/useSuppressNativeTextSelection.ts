import { useEffect, useRef } from 'react'
import { clearDomTextSelection } from '../utils/clearDomTextSelection'

function selectionAnchorInside(el: HTMLElement): boolean {
  const sel = window.getSelection?.()
  if (!sel || sel.rangeCount === 0) return false
  const node = sel.anchorNode
  if (!node) return false
  const element = node.nodeType === Node.TEXT_NODE ? node.parentElement : (node as Element)
  return !!(element && el.contains(element))
}

/**
 * Stops Android/WebView text-selection UI on long-press for interactive rows/cards.
 * CSS user-select alone is often ignored when gesture hits text nodes.
 */
export function useSuppressNativeTextSelection<T extends HTMLElement>() {
  const ref = useRef<T | null>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const prevent = (e: Event) => {
      e.preventDefault()
    }

    const clearIfInside = () => {
      if (!selectionAnchorInside(el)) return
      clearDomTextSelection()
    }

    const onTouchStart = () => {
      clearDomTextSelection()
    }

    const touchOpts: AddEventListenerOptions = { capture: true, passive: true }

    el.addEventListener('selectstart', prevent, true)
    el.addEventListener('dragstart', prevent, true)
    el.addEventListener('touchstart', onTouchStart, touchOpts)
    document.addEventListener('selectionchange', clearIfInside)

    return () => {
      el.removeEventListener('selectstart', prevent, true)
      el.removeEventListener('dragstart', prevent, true)
      el.removeEventListener('touchstart', onTouchStart, touchOpts)
      document.removeEventListener('selectionchange', clearIfInside)
    }
  }, [])

  return ref
}
