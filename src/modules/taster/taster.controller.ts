import type { FastifyReply, FastifyRequest } from 'fastify'
import { idParamSchema } from '../../schemas/common.schema'
import { createTasterSchema, updateTasterSchema } from './taster.schema'
import {
  createTaster,
  deleteTaster,
  getTasterById,
  listTasters,
  updateTaster,
} from './taster.service'

export async function createTasterController(
  req: FastifyRequest,
  res: FastifyReply
) {
  const parsed = createTasterSchema.safeParse(req.body)

  if (!parsed.success) {
    return res.status(400).send(parsed.error.format())
  }

  const item = await createTaster(parsed.data)
  return res.status(201).send(item)
}

export async function listTastersController(
  _: FastifyRequest,
  res: FastifyReply
) {
  const items = await listTasters()
  return res.send(items)
}

export async function getTasterByIdController(
  req: FastifyRequest,
  res: FastifyReply
) {
  const parsed = idParamSchema.safeParse(req.params)

  if (!parsed.success) return res.status(400).send(parsed.error.format())

  const { id } = parsed.data

  const item = await getTasterById(id)

  if (!item)
    return res.status(404).send({ message: 'Taster não encontrado' })

  return res.send(item)
}

export async function updateTasterController(
  req: FastifyRequest,
  res: FastifyReply
) {
  const parsed = idParamSchema.safeParse(req.params)

  if (!parsed.success) return res.status(400).send(parsed.error.format())

  const { id } = parsed.data

  const parsedBody = updateTasterSchema.safeParse(req.body)

  if (!parsedBody.success)
    return res.status(400).send(parsedBody.error.format())

  const item = await updateTaster(id, parsedBody.data)

  return res.send(item)
}

export async function deleteTasterController(
  req: FastifyRequest,
  res: FastifyReply
) {
  const parsed = idParamSchema.safeParse(req.params)

  if (!parsed.success) return res.status(400).send(parsed.error.format())

  const { id } = parsed.data

  await deleteTaster(id)

  return res.send({ message: 'Taster deletado com sucesso' })
}
