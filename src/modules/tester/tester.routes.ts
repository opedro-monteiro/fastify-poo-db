import { z } from 'zod'
import { commonResponseSchema } from '../../schemas/common.response.schema'
import { idParamSchema } from '../../schemas/common.schema'
import type { FastifyTypedInstance } from '../../types'
import {
  createTesterController,
  deleteTesterController,
  getTesterByIdController,
  listTestersController,
  updateTesterController,
} from './tester.controller'
import {
  testerSchema,
  createTesterSchema,
  updateTesterSchema,
} from './tester.schema'

export async function testerRoutes(app: FastifyTypedInstance) {
  app.post(
    '/testers',
    {
      schema: {
        body: createTesterSchema,
        tags: ['testers'],
        response: {
          201: testerSchema,
          ...commonResponseSchema,
        },
      },
    },
    createTesterController
  )

  app.get(
    '/testers',
    {
      schema: {
        tags: ['testers'],
        response: {
          200: z.array(testerSchema),
          ...commonResponseSchema,
        },
      },
    },
    listTestersController
  )

  app.get(
    '/testers/:id',
    {
      schema: {
        tags: ['testers'],
        params: idParamSchema,
        response: {
          200: testerSchema,
          ...commonResponseSchema,
        },
      },
    },
    getTesterByIdController
  )

  app.put(
    '/testers/:id',
    {
      schema: {
        tags: ['testers'],
        params: idParamSchema,
        body: updateTesterSchema,
        response: {
          200: testerSchema,
          ...commonResponseSchema,
        },
      },
    },
    updateTesterController
  )

  app.delete(
    '/testers/:id',
    {
      schema: {
        tags: ['testers'],
        params: idParamSchema,
        response: {
          200: z.object({ message: z.string() }),
          ...commonResponseSchema,
        },
      },
    },
    deleteTesterController
  )
}
