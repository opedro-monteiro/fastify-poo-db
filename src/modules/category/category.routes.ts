import { z } from 'zod'
import { commonResponseSchema } from '../../schemas/common.response.schema'
import { idParamSchema } from '../../schemas/common.schema'
import type { FastifyTypedInstance } from '../../types'
import {
  createCategoryController,
  deleteCategoryController,
  getCategoryByIdController,
  listCategorysController,
  updateCategoryController,
} from './category.controller'
import {
  categorySchema,
  createCategorySchema,
  updateCategorySchema,
} from './category.schema'

export async function categoryRoutes(app: FastifyTypedInstance) {
  app.post(
    '/categories',
    {
      schema: {
        body: createCategorySchema,
        tags: ['categories'],
        response: {
          201: categorySchema,
          ...commonResponseSchema,
        },
      },
    },
    createCategoryController
  )

  app.get(
    '/categories',
    {
      schema: {
        tags: ['categories'],
        response: {
          200: z.array(categorySchema),
          ...commonResponseSchema,
        },
      },
    },
    listCategorysController
  )

  app.get(
    '/categories/:id',
    {
      schema: {
        params: idParamSchema,
        tags: ['categories'],
        response: {
          200: categorySchema,
          ...commonResponseSchema,
        },
      },
    },
    getCategoryByIdController
  )

  app.put(
    '/categories/:id',
    {
      schema: {
        params: idParamSchema,
        body: updateCategorySchema,
        tags: ['categories'],
        response: {
          200: categorySchema,
          ...commonResponseSchema,
        },
      },
    },
    updateCategoryController
  )

  app.delete(
    '/categories/:id',
    {
      schema: {
        params: idParamSchema,
        tags: ['categories'],
        response: {
          200: z.object({ message: z.string() }),
          ...commonResponseSchema,
        },
      },
    },
    deleteCategoryController
  )
}
