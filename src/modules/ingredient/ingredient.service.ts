import { prisma } from '../../libs/prisma'
import type {
  CreateIngredientInput,
  UpdateIngredientInput,
} from './ingredient.schema'

export async function createIngredient(data: CreateIngredientInput) {
  return prisma.ingrediente.create({ data })
}

export async function listIngredients() {
  return prisma.ingrediente.findMany()
}

export async function getIngredientById(id: string) {
  return prisma.ingrediente.findUnique({ where: { id: Number(id) } })
}

export async function updateIngredient(
  id: string,
  data: UpdateIngredientInput
) {
  return prisma.ingrediente.update({ where: { id: Number(id) }, data })
}

export async function deleteIngredient(id: string) {
  return prisma.ingrediente.delete({ where: { id: Number(id) } })
}
