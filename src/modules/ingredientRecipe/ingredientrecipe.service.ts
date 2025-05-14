import { NotFoundError } from '../../error'
import { prisma } from '../../libs/prisma'
import type {
  CreateIngredientRecipeInput,
  IngredientRecipe,
  UpdateIngredientRecipeInput,
} from './ingredientrecipe.schema'

export async function createIngredientRecipe(
  data: CreateIngredientRecipeInput
): Promise<IngredientRecipe> {
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

  const ingredientRecipe = await prisma.ingredienteReceita.create({ data })

  return {
    id: ingredientRecipe.id,
    ingredienteId: ingredientRecipe.ingredienteId,
    receitaId: ingredientRecipe.receitaId,
    quantidade: ingredientRecipe.quantidade,
    medida: ingredientRecipe.medida,
    nomeIngrediente: findIngredient.nome,
    nomeReceita: findRecipe.nome,
  }
}

export async function listIngredientRecipes(): Promise<IngredientRecipe[]> {
  const ingredientesReceitas = await prisma.ingredienteReceita.findMany({
    select: {
      id: true,
      quantidade: true,
      medida: true,
      ingredienteId: true,
      receitaId: true,
      ingrediente: {
        select: {
          nome: true,
        },
      },
      receita: {
        select: {
          nome: true,
        },
      },
    },
  })

  // Mapeia para "achatar" o objeto
  return ingredientesReceitas.map(item => ({
    id: item.id,
    quantidade: item.quantidade,
    medida: item.medida,
    ingredienteId: item.ingredienteId,
    nomeIngrediente: item.ingrediente.nome,
    receitaId: item.receitaId,
    nomeReceita: item.receita.nome,
  }))
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
