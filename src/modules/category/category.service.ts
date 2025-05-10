import { prisma } from '../../libs/prisma'
import type {
  CreateCategoryInput,
  UpdateCategoryInput,
} from './category.schema'

export async function createCategory(data: CreateCategoryInput) {
  return prisma.categoria.create({ data })
}

export async function listCategorys() {
  return prisma.categoria.findMany()
}

export async function getCategoryById(id: string) {
  return prisma.categoria.findUnique({ where: { id: Number(id) } })
}

export async function updateCategory(id: string, data: UpdateCategoryInput) {
  return prisma.categoria.update({ where: { id: Number(id) }, data })
}

export async function deleteCategory(id: string) {
  return prisma.categoria.delete({ where: { id: Number(id) } })
}
