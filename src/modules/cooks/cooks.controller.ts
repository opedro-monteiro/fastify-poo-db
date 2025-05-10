import type { FastifyReply, FastifyRequest } from 'fastify'
import { idParamSchema } from '../../schemas/common.schema'
import { createCooksSchema, updateCooksSchema } from './cooks.schema'
import {
  createCooks,
  deleteCooks,
  getCooksById,
  listCooks,
  updateCooks,
} from './cooks.service'

export async function createCooksController(
  req: FastifyRequest,
  res: FastifyReply
) {
  const parsed = createCooksSchema.safeParse(req.body)

  if (!parsed.success) {
    return res.status(400).send(parsed.error.format())
  }

  const item = await createCooks(parsed.data)
  return res.status(201).send(item)
}

export async function listCookssController(
  _: FastifyRequest,
  res: FastifyReply
) {
  const items = await listCooks()
  return res.send(items)
}

export async function getCooksByIdController(
  req: FastifyRequest,
  res: FastifyReply
) {
  const parsed = idParamSchema.safeParse(req.params)

  if (!parsed.success) return res.status(400).send(parsed.error.format())

  const { id } = parsed.data

  const item = await getCooksById(id)

  if (!item)
    return res.status(404).send({ message: 'Cooks não encontrado' })

  return res.send(item)
}

export async function updateCooksController(
  req: FastifyRequest,
  res: FastifyReply
) {
  const parsed = idParamSchema.safeParse(req.params)

  if (!parsed.success) return res.status(400).send(parsed.error.format())

  const { id } = parsed.data

  const parsedBody = updateCooksSchema.safeParse(req.body)

  if (!parsedBody.success)
    return res.status(400).send(parsedBody.error.format())

  const item = await updateCooks(id, parsedBody.data)

  return res.send(item)
}

export async function deleteCooksController(
  req: FastifyRequest,
  res: FastifyReply
) {
  const parsed = idParamSchema.safeParse(req.params)

  if (!parsed.success) return res.status(400).send(parsed.error.format())

  const { id } = parsed.data

  await deleteCooks(id)

  return res.send({ message: 'Cooks deletado com sucesso' })
}
