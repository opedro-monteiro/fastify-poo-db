import { prisma } from '../../libs/prisma'
import type {
  CreateRecipeInput,
  UpdateRecipeInput,
} from './recipe.schema'

export async function createRecipe(data: CreateRecipeInput) {
  return prisma.recipe.create({ data })
}

export async function listRecipes() {
  return prisma.recipe.findMany()
}

export async function getRecipeById(id: string) {
  return prisma.recipe.findUnique({ where: { id: Number(id) } })
}

export async function updateRecipe(id: string, data: UpdateRecipeInput) {
  return prisma.recipe.update({ where: { id: Number(id) }, data })
}

export async function deleteRecipe(id: string) {
  return prisma.recipe.delete({ where: { id: Number(id) } })
}
