import { z } from 'zod'
import {
  IngredientFromRecipeCreateSchema,
  IngredientFromRecipeSchema,
} from '../ingredientRecipe/ingredientrecipe.schema'

export const recipeSchema = z.object({
  id: z.number(),
  nome: z.string(),
  dt_criacao: z.coerce.date(),
  categoriaId: z.number(),
  nomeCategoria: z.string(),
  cozinheiroId: z.number(),
  nomeCozinheiro: z.string(),
  livroId: z.number().nullable().default(null),
  nomeLivro: z.string().nullable().default(''),
  ingredientes: IngredientFromRecipeSchema.array(),
})
export type Recipe = z.infer<typeof recipeSchema>

export const createRecipeSchema = z.object({
  nome: z.string(),
  dt_criacao: z.coerce.date(),
  categoriaId: z.coerce.number(),
  cozinheiroId: z.coerce.number(),
  livroId: z.coerce.number().nullable().default(null),
  ingredientes: IngredientFromRecipeCreateSchema.array(),
})
export type CreateRecipeInput = z.infer<typeof createRecipeSchema>

export const updateRecipeSchema = createRecipeSchema.partial().extend({
  ingredientes: IngredientFromRecipeCreateSchema.array().min(
    1,
    'Deve conter pelo menos um ingrediente.'
  ),
})
export type UpdateRecipeInput = z.infer<typeof updateRecipeSchema>
