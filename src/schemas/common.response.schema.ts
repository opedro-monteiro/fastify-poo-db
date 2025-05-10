import { z } from 'zod'

export const commonResponseSchema = {
  400: z.object({ message: z.string() }),
  404: z.object({ message: z.string() }),
  500: z.object({ message: z.string() }),
}
