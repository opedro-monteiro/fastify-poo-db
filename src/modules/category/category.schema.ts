import { z } from 'zod'

export const categorySchema = z.object({
  id: z.number(),
  nome: z.string(),
})
export type Category = z.infer<typeof categorySchema>

export const createCategorySchema = z.object({
  nome: z.string().min(1, 'Nome é obrigatório'),
})
export type CreateCategoryInput = z.infer<typeof createCategorySchema>

export const updateCategorySchema = createCategorySchema.partial()
export type UpdateCategoryInput = z.infer<typeof updateCategorySchema>
