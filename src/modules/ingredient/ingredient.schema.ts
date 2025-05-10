import { z } from 'zod'

export const ingredientSchema = z.object({
  id: z.number(),
  nome: z.string(),
  descricao: z.string().nullable(),
})
export type Ingredient = z.infer<typeof ingredientSchema>

export const createIngredientSchema = z.object({
  nome: z.string().min(1, 'Nome é obrigatório'),
  descricao: z.string().optional(),
})
export type CreateIngredientInput = z.infer<typeof createIngredientSchema>

export const updateIngredientSchema = createIngredientSchema.partial()
export type UpdateIngredientInput = z.infer<typeof updateIngredientSchema>
