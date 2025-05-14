import { z } from 'zod'
import { commonResponseSchema } from '../../schemas/common.response.schema'
import { idParamSchema } from '../../schemas/common.schema'
import type { FastifyTypedInstance } from '../../types'
import {
  createIngredientRecipeController,
  deleteIngredientRecipeController,
  getIngredientRecipeByIdController,
  listIngredientRecipesController,
  updateIngredientRecipeController,
} from './ingredientrecipe.controller'
import {
  ingredientrecipeSchema,
  createIngredientRecipeSchema,
  updateIngredientRecipeSchema,
} from './ingredientrecipe.schema'

export async function ingredientrecipeRoutes(app: FastifyTypedInstance) {
  app.post(
    '/ingredients-recipes',
    {
      schema: {
        body: createIngredientRecipeSchema,
        tags: ['ingredients-recipes'],
        response: {
          201: ingredientrecipeSchema,
          ...commonResponseSchema,
        },
      },
    },
    createIngredientRecipeController
  )

  app.get(
    '/ingredients-recipes',
    {
      schema: {
        tags: ['ingredients-recipes'],
        response: {
          200: z.array(ingredientrecipeSchema),
          ...commonResponseSchema,
        },
      },
    },
    listIngredientRecipesController
  )

  app.get(
    '/ingredients-recipes/:id',
    {
      schema: {
        tags: ['ingredients-recipes'],
        params: idParamSchema,
        response: {
          200: ingredientrecipeSchema,
          ...commonResponseSchema,
        },
      },
    },
    getIngredientRecipeByIdController
  )

  app.put(
    '/ingredients-recipes/:id',
    {
      schema: {
        tags: ['ingredients-recipes'],
        params: idParamSchema,
        body: updateIngredientRecipeSchema,
        response: {
          200: ingredientrecipeSchema,
          ...commonResponseSchema,
        },
      },
    },
    updateIngredientRecipeController
  )

  app.delete(
    '/ingredients-recipes/:id',
    {
      schema: {
        tags: ['ingredients-recipes'],
        params: idParamSchema,
        response: {
          200: z.object({ message: z.string() }),
          ...commonResponseSchema,
        },
      },
    },
    deleteIngredientRecipeController
  )
}
