import { z } from 'zod'
import { commonResponseSchema } from '../../schemas/common.response.schema'
import { idParamSchema } from '../../schemas/common.schema'
import type { FastifyTypedInstance } from '../../types'
import {
  createEditorController,
  deleteEditorController,
  getEditorByIdController,
  listEditorsController,
  updateEditorController,
} from './editor.controller'
import {
  editorSchema,
  createEditorSchema,
  updateEditorSchema,
} from './editor.schema'

export async function editorRoutes(app: FastifyTypedInstance) {
  app.post(
    '/editors',
    {
      schema: {
        body: createEditorSchema,
        tags: ['editors'],
        response: {
          201: editorSchema,
          ...commonResponseSchema,
        },
      },
    },
    createEditorController
  )

  app.get(
    '/editors',
    {
      schema: {
        tags: ['editors'],
        response: {
          200: z.array(editorSchema),
          ...commonResponseSchema,
        },
      },
    },
    listEditorsController
  )

  app.get(
    '/editors/:id',
    {
      schema: {
        tags: ['editors'],
        params: idParamSchema,
        response: {
          200: editorSchema,
          ...commonResponseSchema,
        },
      },
    },
    getEditorByIdController
  )

  app.put(
    '/editors/:id',
    {
      schema: {
        tags: ['editors'],
        params: idParamSchema,
        body: updateEditorSchema,
        response: {
          200: editorSchema,
          ...commonResponseSchema,
        },
      },
    },
    updateEditorController
  )

  app.delete(
    '/editors/:id',
    {
      schema: {
        tags: ['editors'],
        params: idParamSchema,
        response: {
          200: z.object({ message: z.string() }),
          ...commonResponseSchema,
        },
      },
    },
    deleteEditorController
  )
}
