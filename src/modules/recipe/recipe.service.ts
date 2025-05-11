import { prisma } from '../../libs/prisma'
import type { CreateRecipeInput, UpdateRecipeInput } from './recipe.schema'

async function isValid(data: CreateRecipeInput) {
  const findCategory = await prisma.categoria.findUnique({
    where: { id: data.categoriaId },
  })

  if (!findCategory) {
    throw new Error('Categoria não encontrada')
  }

  // Validação de cozinheiro
  const findCook = await prisma.cozinheiro.findUnique({
    where: { id: data.cozinheiroId },
  })

  if (!findCook) {
    throw new Error('Cozinheiro não encontrado')
  }

  // Validação de livro (se informado)
  if (data.livroId) {
    const findBook = await prisma.livro.findUnique({
      where: { id: data.livroId },
    })

    if (!findBook) {
      throw new Error('Livro não encontrado')
    }
  }

  return true
}

export async function createRecipe(data: CreateRecipeInput) {
  try {
    if (!isValid(data)) {
      throw new Error('Categoria inválida')
    }

    // Validação de todos os ingredientes em uma única consulta
    const ingredientesIds = data.ingredientes.map(item => item.ingredienteId)
    const ingredientesEncontrados = await prisma.ingrediente.findMany({
      where: { id: { in: ingredientesIds } },
    })

    if (ingredientesEncontrados.length !== ingredientesIds.length) {
      throw new Error('Um ou mais ingredientes não foram encontrados')
    }

    // Transação para garantir consistência entre criação da receita e ingredientes
    const recipeCreated = await prisma.$transaction(async tx => {
      // Criação da receita
      const receita = await tx.receita.create({
        data: {
          nome: data.nome,
          dt_criacao: data.dt_criacao,
          categoriaId: data.categoriaId,
          cozinheiroId: data.cozinheiroId,
          livroId: data.livroId,
        },
        select: {
          id: true,
          nome: true,
          dt_criacao: true,
          categoriaId: true,
          cozinheiroId: true,
          livroId: true,
          ingredientes: {
            select: {
              ingredienteId: true,
              quantidade: true,
              medida: true,
            },
          },
        },
      })

      // Criação dos vínculos com os ingredientes
      await tx.ingredienteReceita.createMany({
        data: data.ingredientes.map(ingrediente => ({
          ingredienteId: ingrediente.ingredienteId,
          quantidade: ingrediente.quantidade,
          medida: ingrediente.medida,
          receitaId: receita.id,
        })),
      })

      return receita
    })

    return recipeCreated
  } catch (error) {
    console.log(error)
  }
}

export async function listRecipes() {
  return prisma.receita.findMany({
    include: {
      ingredientes: true,
    },
  })
}

export async function getRecipeById(id: string) {
  return prisma.receita.findUnique({
    where: { id: Number(id) },
    select: {
      id: true,
      nome: true,
      dt_criacao: true,
      categoriaId: true,
      cozinheiroId: true,
      livroId: true,
      ingredientes: {
        select: {
          ingredienteId: true,
          quantidade: true,
          medida: true,
        },
      },
    },
  })
}

export async function updateRecipe(id: string, data: UpdateRecipeInput) {
  try {
    const existingRecipe = await prisma.receita.findUnique({
      where: { id: Number(id) },
    })
    if (!existingRecipe) {
      throw new Error('Receita não encontrada')
    }

    // Valida categoria, cozinheiro e livro somente se vierem no `data`
    if (data.categoriaId) {
      const categoria = await prisma.categoria.findUnique({
        where: { id: data.categoriaId },
      })
      if (!categoria) throw new Error('Categoria não encontrada')
    }

    if (data.cozinheiroId) {
      const cozinheiro = await prisma.cozinheiro.findUnique({
        where: { id: data.cozinheiroId },
      })
      if (!cozinheiro) throw new Error('Cozinheiro não encontrado')
    }

    if (data.livroId !== undefined && data.livroId !== null) {
      const livro = await prisma.livro.findUnique({
        where: { id: data.livroId },
      })
      if (!livro) throw new Error('Livro não encontrado')
    }

    // Se ingredientes forem passados, validar
    if (data.ingredientes) {
      const ingredientesIds = data.ingredientes.map(i => i.ingredienteId)
      const encontrados = await prisma.ingrediente.findMany({
        where: { id: { in: ingredientesIds } },
      })

      if (encontrados.length !== ingredientesIds.length) {
        throw new Error('Um ou mais ingredientes não foram encontrados')
      }
    }

    // Transação para atualizar receita + ingredientes se existirem
    const recipeUpdated = await prisma.$transaction(async tx => {
      const updated = await tx.receita.update({
        where: { id: Number(id) },
        data: {
          nome: data.nome,
          dt_criacao: data.dt_criacao,
          categoriaId: data.categoriaId,
          cozinheiroId: data.cozinheiroId,
          livroId: data.livroId,
        },
        select: {
          id: true,
          nome: true,
          dt_criacao: true,
          categoriaId: true,
          cozinheiroId: true,
          livroId: true,
          ingredientes: {
            select: {
              ingredienteId: true,
              quantidade: true,
              medida: true,
            },
          },
        },
      })

      if (data.ingredientes) {
        await tx.ingredienteReceita.deleteMany({
          where: { receitaId: Number(id) },
        })

        await tx.ingredienteReceita.createMany({
          data: data.ingredientes.map(i => ({
            ingredienteId: i.ingredienteId,
            quantidade: i.quantidade,
            medida: i.medida,
            receitaId: Number(id),
          })),
        })
      }

      return updated
    })

    return recipeUpdated
  } catch (error) {
    console.error(error)
    throw new Error('Erro ao atualizar receita')
  }
}

export async function deleteRecipe(id: string) {
  return prisma.receita.delete({ where: { id: Number(id) } })
}
