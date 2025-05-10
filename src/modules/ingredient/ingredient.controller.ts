import type { FastifyReply, FastifyRequest } from 'fastify'
import { idParamSchema } from '../../schemas/common.schema'
import {
  createIngredientSchema,
  updateIngredientSchema,
} from './ingredient.schema'
import {
  createIngredient,
  deleteIngredient,
  getIngredientById,
  listIngredients,
  updateIngredient,
} from './ingredient.service'

export async function createIngredientController(
  req: FastifyRequest,
  res: FastifyReply
) {
  const parsed = createIngredientSchema.safeParse(req.body)

  if (!parsed.success) {
    return res.status(400).send(parsed.error.format())
  }

  const item = await createIngredient(parsed.data)
  return res.status(201).send(item)
}

export async function listIngredientsController(
  _: FastifyRequest,
  res: FastifyReply
) {
  const items = await listIngredients()
  console.log('@listIngredients', items)
  return res.send(items)
}

export async function getIngredientByIdController(
  req: FastifyRequest,
  res: FastifyReply
) {
  const parsed = idParamSchema.safeParse(req.params)

  if (!parsed.success) return res.status(400).send(parsed.error.format())

  const { id } = parsed.data

  const item = await getIngredientById(id)

  if (!item)
    return res.status(404).send({ message: 'Ingredient não encontrado' })

  return res.send(item)
}

export async function updateIngredientController(
  req: FastifyRequest,
  res: FastifyReply
) {
  const parsed = idParamSchema.safeParse(req.params)

  if (!parsed.success) return res.status(400).send(parsed.error.format())

  const { id } = parsed.data

  const parsedBody = updateIngredientSchema.safeParse(req.body)

  if (!parsedBody.success)
    return res.status(400).send(parsedBody.error.format())

  const item = await updateIngredient(id, parsedBody.data)

  return res.send(item)
}

export async function deleteIngredientController(
  req: FastifyRequest,
  res: FastifyReply
) {
  const parsed = idParamSchema.safeParse(req.params)

  if (!parsed.success) return res.status(400).send(parsed.error.format())

  const { id } = parsed.data

  await deleteIngredient(id)

  return res.send({ message: 'Ingredient deletado com sucesso' })
}
