import { removeBach } from '../storage/bachStorage'

export function removeBachUseCase(id: string): void {
  removeBach(id)
}
