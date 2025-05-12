import type { FastifyReply, FastifyRequest } from 'fastify'
import { idParamSchema } from '../../schemas/common.schema'
import { createEditorSchema, updateEditorSchema } from './editor.schema'
import {
  createEditor,
  deleteEditor,
  getEditorById,
  listEditors,
  updateEditor,
} from './editor.service'

export async function createEditorController(
  req: FastifyRequest,
  res: FastifyReply
) {
  const parsed = createEditorSchema.safeParse(req.body)

  if (!parsed.success) {
    return res.status(400).send(parsed.error.format())
  }

  const item = await createEditor(parsed.data)
  return res.status(201).send(item)
}

export async function listEditorsController(
  _: FastifyRequest,
  res: FastifyReply
) {
  const items = await listEditors()
  return res.send(items)
}

export async function getEditorByIdController(
  req: FastifyRequest,
  res: FastifyReply
) {
  const parsed = idParamSchema.safeParse(req.params)

  if (!parsed.success) return res.status(400).send(parsed.error.format())

  const { id } = parsed.data

  const item = await getEditorById(id)

  if (!item)
    return res.status(404).send({ message: 'Editor não encontrado' })

  return res.send(item)
}

export async function updateEditorController(
  req: FastifyRequest,
  res: FastifyReply
) {
  const parsed = idParamSchema.safeParse(req.params)

  if (!parsed.success) return res.status(400).send(parsed.error.format())

  const { id } = parsed.data

  const parsedBody = updateEditorSchema.safeParse(req.body)

  if (!parsedBody.success)
    return res.status(400).send(parsedBody.error.format())

  const item = await updateEditor(id, parsedBody.data)

  return res.send(item)
}

export async function deleteEditorController(
  req: FastifyRequest,
  res: FastifyReply
) {
  const parsed = idParamSchema.safeParse(req.params)

  if (!parsed.success) return res.status(400).send(parsed.error.format())

  const { id } = parsed.data

  await deleteEditor(id)

  return res.send({ message: 'Editor deletado com sucesso' })
}
