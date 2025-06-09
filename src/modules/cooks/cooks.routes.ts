import { z } from 'zod'
import { commonResponseSchema } from '../../schemas/common.response.schema'
import { idParamSchema } from '../../schemas/common.schema'
import type { FastifyTypedInstance } from '../../types'
import {
  createCooksController,
  deleteCooksController,
  getCooksByIdController,
  getOldestCooksController,
  listCooksRankingsByYearController,
  listCookssController,
  updateCooksController,
} from './cooks.controller'
import {
  CooksDetailedSchema,
  cooksRankingSchemaByYear,
  cooksSchema,
  createCooksSchema,
  listCooksRankingsByYearQuerySchema,
  updateCooksSchema,
} from './cooks.schema'

export async function cooksRoutes(app: FastifyTypedInstance) {
  app.post(
    '/cooks',
    {
      schema: {
        body: createCooksSchema,
        tags: ['cooks'],
        response: {
          201: cooksSchema,
          ...commonResponseSchema,
        },
      },
    },
    createCooksController
  )

  app.get(
    '/cooks',
    {
      schema: {
        tags: ['cooks'],
        response: {
          200: z.array(cooksSchema),
          ...commonResponseSchema,
        },
      },
    },
    listCookssController
  )

  app.get(
    '/cooks/ranking',
    {
      schema: {
        tags: ['cooks'],
        querystring: listCooksRankingsByYearQuerySchema,
        response: {
          200: z.array(cooksRankingSchemaByYear),
          ...commonResponseSchema,
        },
      },
    },
    listCooksRankingsByYearController
  )

  app.get(
    '/cooks/oldest',
    {
      schema: {
        tags: ['cooks'],
        response: {
          200: CooksDetailedSchema,
          ...commonResponseSchema,
        },
      },
    },
    getOldestCooksController
  )

  app.get(
    '/cooks/:id',
    {
      schema: {
        tags: ['cooks'],
        params: idParamSchema,
        response: {
          200: cooksSchema,
          ...commonResponseSchema,
        },
      },
    },
    getCooksByIdController
  )

  app.put(
    '/cooks/:id',
    {
      schema: {
        tags: ['cooks'],
        params: idParamSchema,
        body: updateCooksSchema,
        response: {
          200: cooksSchema,
          ...commonResponseSchema,
        },
      },
    },
    updateCooksController
  )

  app.delete(
    '/cooks/:id',
    {
      schema: {
        tags: ['cooks'],
        params: idParamSchema,
        response: {
          200: z.object({ message: z.string() }),
          ...commonResponseSchema,
        },
      },
    },
    deleteCooksController
  )
}
