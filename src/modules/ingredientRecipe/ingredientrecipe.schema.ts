import { z } from 'zod'

export const ingredientrecipeSchema = z.object({
  id: z.number(),
  ingredienteId: z.number(),
  receitaId: z.number(),
  quantidade: z.number(),
  medida: z.string(),
})
export type IngredientRecipe = z.infer<typeof ingredientrecipeSchema>

export const createIngredientRecipeSchema = z.object({
  ingredienteId: z.number(),
  receitaId: z.number(),
  quantidade: z.number(),
  medida: z.string(),
})

export const IngredientFromRecipeSchema = z.object({
  ingredienteId: z.number(),
  quantidade: z.number(),
  medida: z.string(),
})

export type IngredientFromRecipe = z.infer<typeof IngredientFromRecipeSchema>

export type CreateIngredientRecipeInput = z.infer<
  typeof createIngredientRecipeSchema
>

export const updateIngredientRecipeSchema =
  createIngredientRecipeSchema.partial()

export type UpdateIngredientRecipeInput = z.infer<
  typeof updateIngredientRecipeSchema
>
