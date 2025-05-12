import { z } from 'zod'

export const cooksSchema = z.object({
  id: z.number(),
  nome: z.string(),
  rg: z.string(),
  salario: z.number(),
  dt_contrato: z.coerce.date(),
  nome_fantasia: z.string().nullable(),
  restauranteId: z.number().nullable(),
})
export type Cooks = z.infer<typeof cooksSchema>

export const createCooksSchema = z.object({
  nome: z.string(),
  rg: z.string(),
  salario: z.number(),
  dt_contrato: z.coerce.date(),
  nome_fantasia: z.string().nullable(),
  restauranteId: z.number().nullable(),
})
export type CreateCooksInput = z.infer<typeof createCooksSchema>

export const updateCooksSchema = createCooksSchema.partial()
export type UpdateCooksInput = z.infer<typeof updateCooksSchema>
