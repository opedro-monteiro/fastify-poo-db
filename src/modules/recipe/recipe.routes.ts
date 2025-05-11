import { z } from 'zod'
import { commonResponseSchema } from '../../schemas/common.response.schema'
import { idParamSchema } from '../../schemas/common.schema'
import type { FastifyTypedInstance } from '../../types'
import {
  createRecipeController,
  deleteRecipeController,
  getRecipeByIdController,
  listRecipesController,
  updateRecipeController,
} from './recipe.controller'
import {
  recipeSchema,
  createRecipeSchema,
  updateRecipeSchema,
} from './recipe.schema'

export async function recipeRoutes(app: FastifyTypedInstance) {
  app.post(
    '/recipes',
    {
      schema: {
        body: createRecipeSchema,
        tags: ['recipes'],
        response: {
          201: recipeSchema,
          ...commonResponseSchema,
        },
      },
    },
    createRecipeController
  )

  app.get(
    '/recipes',
    {
      schema: {
        tags: ['recipes'],
        response: {
          200: z.array(recipeSchema),
          ...commonResponseSchema,
        },
      },
    },
    listRecipesController
  )

  app.get(
    '/recipes/:id',
    {
      schema: {
        tags: ['recipes'],
        params: idParamSchema,
        response: {
          200: recipeSchema,
          ...commonResponseSchema,
        },
      },
    },
    getRecipeByIdController
  )

  app.put(
    '/recipes/:id',
    {
      schema: {
        tags: ['recipes'],
        params: idParamSchema,
        body: updateRecipeSchema,
        response: {
          200: recipeSchema,
          ...commonResponseSchema,
        },
      },
    },
    updateRecipeController
  )

  app.delete(
    '/recipes/:id',
    {
      schema: {
        tags: ['recipes'],
        params: idParamSchema,
        response: {
          200: z.object({ message: z.string() }),
          ...commonResponseSchema,
        },
      },
    },
    deleteRecipeController
  )
}
