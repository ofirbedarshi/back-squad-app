import { useEffect, useRef, useState } from 'react'
import type { InfoTooltipProps } from './infoTooltip.types'

function InfoTooltip({ text }: InfoTooltipProps) {
  const [isOpen, setIsOpen] = useState(false)
  const wrapperRef = useRef<HTMLSpanElement | null>(null)

  useEffect(() => {
    function handleOutsideClick(event: MouseEvent) {
      if (!wrapperRef.current?.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleOutsideClick)
    return () => {
      document.removeEventListener('mousedown', handleOutsideClick)
    }
  }, [])

  return (
    <span ref={wrapperRef} className="relative inline-flex items-center">
      <button
        type="button"
        onClick={() => setIsOpen((currentValue) => !currentValue)}
        className="h-5 w-5 rounded-full text-blue-600 bg-blue-50 border border-blue-200 flex items-center justify-center active:scale-95 transition-transform"
        aria-label="הסבר"
      >
        i
      </button>
      {isOpen && (
        <span className="absolute top-full mt-2 right-0 z-50 w-56 rounded-2xl bg-neutral-900 text-white text-sm leading-6 px-3 py-2 shadow-xl">
          {text}
        </span>
      )}
    </span>
  )
}

export default InfoTooltip
