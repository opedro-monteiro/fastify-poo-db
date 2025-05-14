import { z } from 'zod'

export const ingredientrecipeSchema = z.object({
  id: z.coerce.number(),
  ingredienteId: z.coerce.number(),
  nomeIngrediente: z.string(),
  receitaId: z.coerce.number(),
  nomeReceita: z.string(),
  quantidade: z.coerce.number(),
  medida: z.string(),
})
export type IngredientRecipe = z.infer<typeof ingredientrecipeSchema>

export const createIngredientRecipeSchema = z.object({
  ingredienteId: z.coerce.number(),
  receitaId: z.coerce.number(),
  quantidade: z.coerce.number(),
  medida: z.string(),
})
export type CreateIngredientRecipeInput = z.infer<
  typeof createIngredientRecipeSchema
>

export const IngredientFromRecipeSchema = z.object({
  ingredienteId: z.coerce.number(),
  quantidade: z.coerce.number(),
  medida: z.string(),
  nome: z.string(),
})
export type IngredientFromRecipe = z.infer<typeof IngredientFromRecipeSchema>

export const IngredientFromRecipeCreateSchema = IngredientFromRecipeSchema.omit(
  { nome: true }
)
export type IngredientFromRecipeCreate = z.infer<
  typeof IngredientFromRecipeCreateSchema
>

export const updateIngredientRecipeSchema =
  createIngredientRecipeSchema.partial()

export type UpdateIngredientRecipeInput = z.infer<
  typeof updateIngredientRecipeSchema
>
