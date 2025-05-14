import { prisma } from '../../libs/prisma'
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library'

import type {
  CreateRecipeInput,
  Recipe,
  UpdateRecipeInput,
} from './recipe.schema'

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

export async function createRecipe(data: CreateRecipeInput): Promise<Recipe> {
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
          livro: {
            select: {
              titulo: true,
            },
          },
          categoria: {
            select: {
              nome: true,
            },
          },
          cozinheiro: {
            select: {
              nome: true,
            },
          },
          ingredientes: {
            select: {
              ingredienteId: true,
              quantidade: true,
              medida: true,
              ingrediente: {
                select: {
                  nome: true,
                },
              },
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

    return {
      id: recipeCreated.id,
      nome: recipeCreated.nome,
      dt_criacao: recipeCreated.dt_criacao,
      categoriaId: recipeCreated.categoriaId,
      cozinheiroId: recipeCreated.cozinheiroId,
      livroId: recipeCreated.livroId,
      nomeCategoria: recipeCreated.categoria.nome,
      nomeCozinheiro: recipeCreated.cozinheiro.nome,
      nomeLivro: recipeCreated.livro?.titulo ?? null,
      ingredientes: recipeCreated.ingredientes.map(ingrediente => ({
        ingredienteId: ingrediente.ingredienteId,
        quantidade: ingrediente.quantidade,
        medida: ingrediente.medida,
        nome: ingrediente.ingrediente.nome,
      })),
    }
  } catch (error) {
    console.log(error)
    throw new Error(`Erro ao criar receita: ${error}`)
  }
}

export async function listRecipes(): Promise<Recipe[]> {
  const recipes = await prisma.receita.findMany({
    select: {
      id: true,
      nome: true,
      dt_criacao: true,
      categoriaId: true,
      cozinheiroId: true,
      livroId: true,
      livro: {
        select: {
          titulo: true,
        },
      },
      categoria: {
        select: {
          nome: true,
        },
      },
      cozinheiro: {
        select: {
          nome: true,
        },
      },
      ingredientes: {
        select: {
          ingredienteId: true,
          quantidade: true,
          medida: true,
          ingrediente: {
            select: {
              nome: true,
            },
          },
        },
      },
    },
  })

  return recipes.map(item => ({
    id: item.id,
    nome: item.nome,
    dt_criacao: item.dt_criacao,
    categoriaId: item.categoriaId,
    cozinheiroId: item.cozinheiroId,
    livroId: item.livroId,
    nomeCategoria: item.categoria.nome,
    nomeCozinheiro: item.cozinheiro.nome,
    nomeLivro: item.livro?.titulo ?? null,
    ingredientes: item.ingredientes.map(ingrediente => ({
      ingredienteId: ingrediente.ingredienteId,
      quantidade: ingrediente.quantidade,
      medida: ingrediente.medida,
      nome: ingrediente.ingrediente.nome,
    })),
  }))
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

export async function updateRecipe(
  id: string,
  data: UpdateRecipeInput
): Promise<Recipe> {
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
          livro: {
            select: {
              titulo: true,
            },
          },
          categoria: {
            select: {
              nome: true,
            },
          },
          cozinheiro: {
            select: {
              nome: true,
            },
          },
          ingredientes: {
            select: {
              ingredienteId: true,
              quantidade: true,
              medida: true,
              ingrediente: {
                select: {
                  nome: true,
                },
              },
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

    return {
      id: recipeUpdated.id,
      nome: recipeUpdated.nome,
      dt_criacao: recipeUpdated.dt_criacao,
      categoriaId: recipeUpdated.categoriaId,
      cozinheiroId: recipeUpdated.cozinheiroId,
      livroId: recipeUpdated.livroId,
      nomeCategoria: recipeUpdated.categoria.nome,
      nomeCozinheiro: recipeUpdated.cozinheiro.nome,
      nomeLivro: recipeUpdated.livro?.titulo ?? null,
      ingredientes: recipeUpdated.ingredientes.map(ingrediente => ({
        ingredienteId: ingrediente.ingredienteId,
        quantidade: ingrediente.quantidade,
        medida: ingrediente.medida,
        nome: ingrediente.ingrediente.nome,
      })),
    }
  } catch (error) {
    console.error(error)
    throw new Error(`Erro ao atualizar receita: ${error}`)
  }
}

export async function deleteRecipe(id: string) {
  try {
    const recipeId = Number(id)

    // Deleta os testes relacionados
    await prisma.teste.deleteMany({
      where: { receitaId: recipeId },
    })

    // Deleta os ingredientes relacionados
    await prisma.ingredienteReceita.deleteMany({
      where: { receitaId: recipeId },
    })

    // Deleta a receita
    await prisma.receita.delete({
      where: { id: recipeId },
    })

    return { message: 'Receita deletada com sucesso.' }
  } catch (error) {
    if (error instanceof PrismaClientKnownRequestError) {
      if (error.code === 'P2003') {
        throw new Error('Não é possível deletar: receita possui dependências.')
      }
      if (error.code === 'P2025') {
        throw new Error('Receita não encontrada.')
      }
    }

    throw new Error('Erro interno ao tentar deletar a receita.')
  }
}
