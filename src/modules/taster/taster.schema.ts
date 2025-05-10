import { z } from 'zod'

export const tasterSchema = z.object({
  id: z.number(),
  rg: z.string(),
  nome: z.string(),
  salario: z.number(),
  dt_contrato: z.coerce.date(),
})
export type Taster = z.infer<typeof tasterSchema>

export const createTasterSchema = z.object({
  rg: z.string(),
  nome: z.string(),
  salario: z.number(),
  dt_contrato: z.coerce.date(),
})
export type CreateTasterInput = z.infer<typeof createTasterSchema>

export const updateTasterSchema = createTasterSchema.partial()
export type UpdateTasterInput = z.infer<typeof updateTasterSchema>
