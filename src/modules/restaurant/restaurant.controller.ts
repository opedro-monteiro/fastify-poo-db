import type { FastifyReply, FastifyRequest } from 'fastify'
import { idParamSchema } from '../../schemas/common.schema'
import { createRestaurantSchema, updateRestaurantSchema } from './restaurant.schema'
import {
  createRestaurant,
  deleteRestaurant,
  getRestaurantById,
  listRestaurants,
  updateRestaurant,
} from './restaurant.service'

export async function createRestaurantController(
  req: FastifyRequest,
  res: FastifyReply
) {
  const parsed = createRestaurantSchema.safeParse(req.body)

  if (!parsed.success) {
    return res.status(400).send(parsed.error.format())
  }

  const item = await createRestaurant(parsed.data)
  return res.status(201).send(item)
}

export async function listRestaurantsController(
  _: FastifyRequest,
  res: FastifyReply
) {
  const items = await listRestaurants()
  return res.send(items)
}

export async function getRestaurantByIdController(
  req: FastifyRequest,
  res: FastifyReply
) {
  const parsed = idParamSchema.safeParse(req.params)

  if (!parsed.success) return res.status(400).send(parsed.error.format())

  const { id } = parsed.data

  const item = await getRestaurantById(id)

  if (!item)
    return res.status(404).send({ message: 'Restaurant não encontrado' })

  return res.send(item)
}

export async function updateRestaurantController(
  req: FastifyRequest,
  res: FastifyReply
) {
  const parsed = idParamSchema.safeParse(req.params)

  if (!parsed.success) return res.status(400).send(parsed.error.format())

  const { id } = parsed.data

  const parsedBody = updateRestaurantSchema.safeParse(req.body)

  if (!parsedBody.success)
    return res.status(400).send(parsedBody.error.format())

  const item = await updateRestaurant(id, parsedBody.data)

  return res.send(item)
}

export async function deleteRestaurantController(
  req: FastifyRequest,
  res: FastifyReply
) {
  const parsed = idParamSchema.safeParse(req.params)

  if (!parsed.success) return res.status(400).send(parsed.error.format())

  const { id } = parsed.data

  await deleteRestaurant(id)

  return res.send({ message: 'Restaurant deletado com sucesso' })
}
