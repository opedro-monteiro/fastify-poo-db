import { z } from 'zod'
import { commonResponseSchema } from '../../schemas/common.response.schema'
import { idParamSchema } from '../../schemas/common.schema'
import type { FastifyTypedInstance } from '../../types'
import {
  createTasterController,
  deleteTasterController,
  getTasterByIdController,
  listTastersController,
  updateTasterController,
} from './taster.controller'
import {
  tasterSchema,
  createTasterSchema,
  updateTasterSchema,
} from './taster.schema'

export async function tasterRoutes(app: FastifyTypedInstance) {
  app.post(
    '/tasters',
    {
      schema: {
        body: createTasterSchema,
        tags: ['tasters'],
        response: {
          201: tasterSchema,
          ...commonResponseSchema,
        },
      },
    },
    createTasterController
  )

  app.get(
    '/tasters',
    {
      schema: {
        tags: ['tasters'],
        response: {
          200: z.array(tasterSchema),
          ...commonResponseSchema,
        },
      },
    },
    listTastersController
  )

  app.get(
    '/tasters/:id',
    {
      schema: {
        tags: ['tasters'],
        params: idParamSchema,
        response: {
          200: tasterSchema,
          ...commonResponseSchema,
        },
      },
    },
    getTasterByIdController
  )

  app.put(
    '/tasters/:id',
    {
      schema: {
        tags: ['tasters'],
        params: idParamSchema,
        body: updateTasterSchema,
        response: {
          200: tasterSchema,
          ...commonResponseSchema,
        },
      },
    },
    updateTasterController
  )

  app.delete(
    '/tasters/:id',
    {
      schema: {
        tags: ['tasters'],
        params: idParamSchema,
        response: {
          200: z.object({ message: z.string() }),
          ...commonResponseSchema,
        },
      },
    },
    deleteTasterController
  )
}
