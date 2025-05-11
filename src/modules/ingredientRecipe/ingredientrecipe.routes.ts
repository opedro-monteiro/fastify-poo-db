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
    '/ingredientrecipes',
    {
      schema: {
        body: createIngredientRecipeSchema,
        tags: ['ingredientrecipes'],
        response: {
          201: ingredientrecipeSchema,
          ...commonResponseSchema,
        },
      },
    },
    createIngredientRecipeController
  )

  app.get(
    '/ingredientrecipes',
    {
      schema: {
        tags: ['ingredientrecipes'],
        response: {
          200: z.array(ingredientrecipeSchema),
          ...commonResponseSchema,
        },
      },
    },
    listIngredientRecipesController
  )

  app.get(
    '/ingredientrecipes/:id',
    {
      schema: {
        tags: ['ingredientrecipes'],
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
    '/ingredientrecipes/:id',
    {
      schema: {
        tags: ['ingredientrecipes'],
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
    '/ingredientrecipes/:id',
    {
      schema: {
        tags: ['ingredientrecipes'],
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
