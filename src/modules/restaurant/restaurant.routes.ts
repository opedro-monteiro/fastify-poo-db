import { z } from 'zod'
import { commonResponseSchema } from '../../schemas/common.response.schema'
import { idParamSchema } from '../../schemas/common.schema'
import type { FastifyTypedInstance } from '../../types'
import {
  createRestaurantController,
  deleteRestaurantController,
  getRestaurantByIdController,
  listRestaurantsController,
  updateRestaurantController,
} from './restaurant.controller'
import {
  restaurantSchema,
  createRestaurantSchema,
  updateRestaurantSchema,
} from './restaurant.schema'

export async function restaurantRoutes(app: FastifyTypedInstance) {
  app.post(
    '/restaurants',
    {
      schema: {
        body: createRestaurantSchema,
        tags: ['restaurants'],
        response: {
          201: restaurantSchema,
          ...commonResponseSchema,
        },
      },
    },
    createRestaurantController
  )

  app.get(
    '/restaurants',
    {
      schema: {
        tags: ['restaurants'],
        response: {
          200: z.array(restaurantSchema),
          ...commonResponseSchema,
        },
      },
    },
    listRestaurantsController
  )

  app.get(
    '/restaurants/:id',
    {
      schema: {
        tags: ['restaurants'],
        params: idParamSchema,
        response: {
          200: restaurantSchema,
          ...commonResponseSchema,
        },
      },
    },
    getRestaurantByIdController
  )

  app.put(
    '/restaurants/:id',
    {
      schema: {
        tags: ['restaurants'],
        params: idParamSchema,
        body: updateRestaurantSchema,
        response: {
          200: restaurantSchema,
          ...commonResponseSchema,
        },
      },
    },
    updateRestaurantController
  )

  app.delete(
    '/restaurants/:id',
    {
      schema: {
        tags: ['restaurants'],
        params: idParamSchema,
        response: {
          200: z.object({ message: z.string() }),
          ...commonResponseSchema,
        },
      },
    },
    deleteRestaurantController
  )
}
