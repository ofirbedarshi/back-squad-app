import { z } from 'zod'

export const coordinateValueSchema = z.object({
  east: z.string().regex(/^\d{6}$/, 'מזרחי: יש להזין 6 ספרות'),
  north: z.string().regex(/^\d{7}$/, 'צפוני: יש להזין 7 ספרות'),
})
