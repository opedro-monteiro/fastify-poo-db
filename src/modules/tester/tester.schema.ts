import { z } from 'zod'

export const testerSchema = z.object({
  id: z.number(),
  receitaId: z.number(),
  degustadorId: z.number(),
  dt_teste: z.coerce.date(),
  nota: z.number(),
})
export type Tester = z.infer<typeof testerSchema>

export const createTesterSchema = z.object({
  receitaId: z.number(),
  degustadorId: z.number(),
  dt_teste: z.coerce.date(),
  nota: z.number(),
})
export type CreateTesterInput = z.infer<typeof createTesterSchema>

export const updateTesterSchema = createTesterSchema.partial()
export type UpdateTesterInput = z.infer<typeof updateTesterSchema>
