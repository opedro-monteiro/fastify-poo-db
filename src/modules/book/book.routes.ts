import { z } from 'zod'
import { commonResponseSchema } from '../../schemas/common.response.schema'
import { idParamSchema } from '../../schemas/common.schema'
import type { FastifyTypedInstance } from '../../types'
import {
  createBookController,
  deleteBookController,
  getBookByIdController,
  listBooksController,
  updateBookController,
} from './book.controller'
import {
  bookSchema,
  createBookSchema,
  updateBookSchema,
} from './book.schema'

export async function bookRoutes(app: FastifyTypedInstance) {
  app.post(
    '/books',
    {
      schema: {
        body: createBookSchema,
        tags: ['books'],
        response: {
          201: bookSchema,
          ...commonResponseSchema,
        },
      },
    },
    createBookController
  )

  app.get(
    '/books',
    {
      schema: {
        tags: ['books'],
        response: {
          200: z.array(bookSchema),
          ...commonResponseSchema,
        },
      },
    },
    listBooksController
  )

  app.get(
    '/books/:id',
    {
      schema: {
        tags: ['books'],
        params: idParamSchema,
        response: {
          200: bookSchema,
          ...commonResponseSchema,
        },
      },
    },
    getBookByIdController
  )

  app.put(
    '/books/:id',
    {
      schema: {
        tags: ['books'],
        params: idParamSchema,
        body: updateBookSchema,
        response: {
          200: bookSchema,
          ...commonResponseSchema,
        },
      },
    },
    updateBookController
  )

  app.delete(
    '/books/:id',
    {
      schema: {
        tags: ['books'],
        params: idParamSchema,
        response: {
          200: z.object({ message: z.string() }),
          ...commonResponseSchema,
        },
      },
    },
    deleteBookController
  )
}
