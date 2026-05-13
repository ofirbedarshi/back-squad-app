import { useState } from 'react'
import { useLongPress } from './useLongPress'

type LongPressWithShakeProps = ReturnType<typeof useLongPress> & {
  className: string
  onAnimationEnd: () => void
}

export function useLongPressWithShake(
  onLongPress?: () => void,
  onPress?: () => void,
): LongPressWithShakeProps {
  const [shaking, setShaking] = useState(false)

  const longPressHandlers = useLongPress(
    () => {
      if (onLongPress) {
        setShaking(true)
        onLongPress()
      }
    },
    onPress,
  )

  return {
    ...longPressHandlers,
    className: shaking ? 'long-press-shake' : '',
    onAnimationEnd: () => setShaking(false),
  }
}
