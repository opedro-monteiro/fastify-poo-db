import { prisma } from '../../libs/prisma'
import type {
  CreateRestaurantInput,
  UpdateRestaurantInput,
} from './restaurant.schema'

export async function createRestaurant(data: CreateRestaurantInput) {
  return prisma.restaurante.create({ data })
}

export async function listRestaurants() {
  return prisma.restaurante.findMany()
}

export async function getRestaurantById(id: string) {
  return prisma.restaurante.findUnique({ where: { id: Number(id) } })
}

export async function updateRestaurant(
  id: string,
  data: UpdateRestaurantInput
) {
  return prisma.restaurante.update({ where: { id: Number(id) }, data })
}

export async function deleteRestaurant(id: string) {
  return prisma.restaurante.delete({ where: { id: Number(id) } })
}
