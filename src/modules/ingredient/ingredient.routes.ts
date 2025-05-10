import { z } from 'zod'
import { commonResponseSchema } from '../../schemas/common.response.schema'
import { idParamSchema } from '../../schemas/common.schema'
import type { FastifyTypedInstance } from '../../types'
import {
  createIngredientController,
  deleteIngredientController,
  getIngredientByIdController,
  listIngredientsController,
  updateIngredientController,
} from './ingredient.controller'
import {
  createIngredientSchema,
  ingredientSchema,
  updateIngredientSchema,
} from './ingredient.schema'

export async function ingredientRoutes(app: FastifyTypedInstance) {
  app.post(
    '/ingredients',
    {
      schema: {
        body: createIngredientSchema,
        tags: ['ingredients'],
        response: {
          201: ingredientSchema,
          ...commonResponseSchema,
        },
      },
    },
    createIngredientController
  )

  app.get(
    '/ingredients',
    {
      schema: {
        tags: ['ingredients'],
        response: {
          200: z.array(ingredientSchema),
          ...commonResponseSchema,
        },
      },
    },
    listIngredientsController
  )

  app.get(
    '/ingredients/:id',
    {
      schema: {
        tags: ['ingredients'],
        params: idParamSchema,
        response: {
          200: ingredientSchema,
          ...commonResponseSchema,
        },
      },
    },
    getIngredientByIdController
  )

  app.put(
    '/ingredients/:id',
    {
      schema: {
        tags: ['ingredients'],
        params: idParamSchema,
        body: updateIngredientSchema,
        response: {
          200: ingredientSchema,
          ...commonResponseSchema,
        },
      },
    },
    updateIngredientController
  )

  app.delete(
    '/ingredients/:id',
    {
      schema: {
        tags: ['ingredients'],
        params: idParamSchema,
        response: {
          200: z.object({ message: z.string() }),
          ...commonResponseSchema,
        },
      },
    },
    deleteIngredientController
  )
}
