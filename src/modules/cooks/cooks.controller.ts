import type { FastifyReply, FastifyRequest } from 'fastify'
import { NotFoundError } from '../../error'
import { idParamSchema } from '../../schemas/common.schema'
import {
  CooksDetailed,
  createCooksSchema,
  listCooksRankingsByYearQuerySchema,
  updateCooksSchema,
} from './cooks.schema'
import {
  createCooks,
  deleteCooks,
  getCooksById,
  getOldestCook,
  listCooks,
  listCooksChampionsByYear,
  updateCooks,
} from './cooks.service'

export async function createCooksController(
  req: FastifyRequest,
  res: FastifyReply
) {
  try {
    const parsed = createCooksSchema.safeParse(req.body)

    if (!parsed.success) {
      return res.status(400).send(parsed.error.format())
    }

    const item = await createCooks(parsed.data)
    return res.status(201).send(item)
  } catch (error) {
    if (error instanceof NotFoundError) {
      return res.status(404).send({ message: error.message })
    }

    req.log.error(error)
    return res.status(500).send({ message: 'Erro interno do servidor' })
  }
}

export async function listCookssController(
  _: FastifyRequest,
  res: FastifyReply
) {
  const items = await listCooks()
  return res.send(items)
}

export async function listCooksRankingsByYearController(
  req: FastifyRequest,
  res: FastifyReply
) {
  const parsed = listCooksRankingsByYearQuerySchema.safeParse(req.query)
  if (!parsed.success)
    return res.status(400).send({ error: parsed.error.flatten() })

  const filters = parsed.data

  const items = await listCooksChampionsByYear(filters)

  return res.send(items)
}

export async function getOldestCooksController(
  _: FastifyRequest,
  res: FastifyReply
) {
  const items = await getOldestCook()
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

  if (!item) return res.status(404).send({ message: 'Cooks não encontrado' })

  return res.send(item)
}

export async function updateCooksController(
  req: FastifyRequest,
  res: FastifyReply
) {
  try {
    const parsed = idParamSchema.safeParse(req.params)

    if (!parsed.success) return res.status(400).send(parsed.error.format())

    const { id } = parsed.data

    const parsedBody = updateCooksSchema.safeParse(req.body)

    if (!parsedBody.success)
      return res.status(400).send(parsedBody.error.format())

    const item = await updateCooks(id, parsedBody.data)

    return res.send(item)
  } catch (error) {
    if (error instanceof NotFoundError) {
      return res.status(404).send({ message: error.message })
    }

    req.log.error(error)
    return res.status(500).send({ message: 'Erro interno do servidor' })
  }
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
