import { useConfirmContext } from '../context/ConfirmContext'
import type { ConfirmOptions } from '../context/confirm.types'

/**
 * Promise resolves to true if the user confirmed, false if cancelled or dismissed.
 */
export function useConfirm(): (options: ConfirmOptions) => Promise<boolean> {
  const { confirm } = useConfirmContext()
  return confirm
}

export type { ConfirmOptions } from '../context/confirm.types'
