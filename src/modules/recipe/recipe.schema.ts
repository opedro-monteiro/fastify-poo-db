import { z } from 'zod'
import { IngredientFromRecipeSchema } from './../ingredientRecipe/ingredientrecipe.schema'

export const recipeSchema = z.object({
  id: z.number(),
  nome: z.string(),
  dt_criacao: z.coerce.date(),
  categoriaId: z.number(),
  cozinheiroId: z.number(),
  livroId: z.number().nullable(),
  ingredientes: IngredientFromRecipeSchema.array(),
})
export type Recipe = z.infer<typeof recipeSchema>

export const createRecipeSchema = z.object({
  nome: z.string(),
  dt_criacao: z.coerce.date(),
  categoriaId: z.number(),
  cozinheiroId: z.number(),
  livroId: z.number().nullable(),
  ingredientes: IngredientFromRecipeSchema.array(),
})
export type CreateRecipeInput = z.infer<typeof createRecipeSchema>

export const updateRecipeSchema = createRecipeSchema.partial()
export type UpdateRecipeInput = z.infer<typeof updateRecipeSchema>
