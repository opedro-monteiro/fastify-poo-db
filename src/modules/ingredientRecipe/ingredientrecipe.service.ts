import { NotFoundError } from '../../error'
import { prisma } from '../../libs/prisma'
import type {
  CreateIngredientRecipeInput,
  UpdateIngredientRecipeInput,
} from './ingredientrecipe.schema'

export async function createIngredientRecipe(
  data: CreateIngredientRecipeInput
) {
  const findIngredient = await prisma.ingrediente.findUnique({
    where: {
      id: data.ingredienteId,
    },
  })

  if (!findIngredient) {
    throw new NotFoundError('Ingrediente não encontrado')
  }

  const findRecipe = await prisma.receita.findUnique({
    where: {
      id: data.receitaId,
    },
  })

  if (!findRecipe) {
    throw new NotFoundError('Receita não encontrada')
  }

  return prisma.ingredienteReceita.create({ data })
}

export async function listIngredientRecipes() {
  return prisma.ingredienteReceita.findMany()
}

export async function getIngredientRecipeById(id: string) {
  return prisma.ingredienteReceita.findUnique({ where: { id: Number(id) } })
}

export async function updateIngredientRecipe(
  id: string,
  data: UpdateIngredientRecipeInput
) {
  return prisma.ingredienteReceita.update({ where: { id: Number(id) }, data })
}

export async function deleteIngredientRecipe(id: string) {
  return prisma.ingredienteReceita.delete({ where: { id: Number(id) } })
}
