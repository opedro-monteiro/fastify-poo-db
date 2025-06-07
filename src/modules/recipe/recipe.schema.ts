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

export const listRecipesQuerySchema = z.object({
  search: z.string().optional(),
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(10),
  ingredients: z
    .union([z.string(), z.array(z.string())])
    .transform((val) => (typeof val === 'string' ? [val] : val))
    .optional(),
  categories: z
    .union([z.string(), z.array(z.string())])
    .transform((val) => (typeof val === 'string' ? [val] : val))
    .optional(),
  sortBy: z.enum(['nome', 'dt_criacao']).default('nome'),
  sortOrder: z.enum(['asc', 'desc']).default('asc'),
});

export type ListRecipesQuery = z.infer<typeof listRecipesQuerySchema>