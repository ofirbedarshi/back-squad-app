import { removeNadbar } from '../storage/nadbarStorage'

export function removeNadbarUseCase(id: string): void {
  removeNadbar(id)
}
