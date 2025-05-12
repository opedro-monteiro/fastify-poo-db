import type { FastifyReply, FastifyRequest } from 'fastify'
import { NotFoundError } from '../../error'
import { idParamSchema } from '../../schemas/common.schema'
import { createTesterSchema, updateTesterSchema } from './tester.schema'
import {
  createTester,
  deleteTester,
  getTesterById,
  listTesters,
  updateTester,
} from './tester.service'

export async function createTesterController(
  req: FastifyRequest,
  res: FastifyReply
) {
  try {
    const parsed = createTesterSchema.safeParse(req.body)

    if (!parsed.success) {
      return res
        .status(400)
        .send({ message: 'Dados inválidos', details: parsed.error.format() })
    }

    const item = await createTester(parsed.data)
    return res.status(201).send(item)
  } catch (error) {
    if (error instanceof NotFoundError) {
      return res.status(404).send({ message: error.message })
    }

    req.log.error(error)
    return res.status(500).send({ message: 'Erro interno do servidor' })
  }
}

export async function listTestersController(
  _: FastifyRequest,
  res: FastifyReply
) {
  const items = await listTesters()
  return res.send(items)
}

export async function getTesterByIdController(
  req: FastifyRequest,
  res: FastifyReply
) {
  const parsed = idParamSchema.safeParse(req.params)

  if (!parsed.success) return res.status(400).send(parsed.error.format())

  const { id } = parsed.data

  const item = await getTesterById(id)

  if (!item) return res.status(404).send({ message: 'Tester não encontrado' })

  return res.send(item)
}

export async function updateTesterController(
  req: FastifyRequest,
  res: FastifyReply
) {
  const parsed = idParamSchema.safeParse(req.params)

  if (!parsed.success) return res.status(400).send(parsed.error.format())

  const { id } = parsed.data

  const parsedBody = updateTesterSchema.safeParse(req.body)

  if (!parsedBody.success)
    return res.status(400).send(parsedBody.error.format())

  const item = await updateTester(id, parsedBody.data)

  return res.send(item)
}

export async function deleteTesterController(
  req: FastifyRequest,
  res: FastifyReply
) {
  const parsed = idParamSchema.safeParse(req.params)

  if (!parsed.success) return res.status(400).send(parsed.error.format())

  const { id } = parsed.data

  await deleteTester(id)

  return res.send({ message: 'Tester deletado com sucesso' })
}
