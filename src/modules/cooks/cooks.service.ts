import { NotFoundError } from '../../error'
import { prisma } from '../../libs/prisma'
import type {
  CooksDetailed,
  CreateCooksInput,
  ListCooksRankingsByYearQuery,
  ListCooksRankingsQuery,
  UpdateCooksInput,
} from './cooks.schema'

export async function createCooks(data: CreateCooksInput) {
  if (data.restauranteId) {
    const findRestaurante = await prisma.restaurante.findUnique({
      where: {
        id: data.restauranteId,
      },
    })

    if (!findRestaurante) {
      throw new NotFoundError('Restaurante não encontrado')
    }
  }

  return prisma.cozinheiro.create({ data })
}

export async function listCooks(filters?: ListCooksRankingsQuery) {
  return prisma.cozinheiro.findMany()
}

export async function getOldestCook(): Promise<CooksDetailed | null> {
  const oldestCook = await prisma.cozinheiro.findFirst({
    orderBy: {
      dt_contrato: 'asc',
    },
    select: {
      nome: true,
      dt_contrato: true,
      restaurante: {
        select: {
          nome: true,
        },
      },
      receitas: {
        select: {
          nome: true,
          dt_criacao: true,
          categoria: {
            select: {
              nome: true,
            },
          },
          livro: {
            select: {
              titulo: true,
            },
          },
        },
      },
    },
  })

  if (!oldestCook) return null

  return {
    nome: oldestCook.nome,
    dataContrato: oldestCook.dt_contrato.toISOString().split('T')[0],
    restauranteOrigem: oldestCook.restaurante?.nome ?? 'Desconhecido',
    receitas: oldestCook.receitas.map(r => ({
      nome: r.nome,
      categoria: r.categoria.nome,
      dataCriacao: r.dt_criacao.toISOString().split('T')[0],
      livros: r.livro ? [r.livro.titulo] : [],
    })),
  }
}

export async function listCooksChampionsByYear(
  filters: ListCooksRankingsByYearQuery
) {
  const { year } = filters

  if (!year) {
    throw new Error('Ano é obrigatório')
  }

  if (typeof year !== 'number' || !Number.isInteger(year)) {
    throw new Error('Ano deve ser um número inteiro')
  }

  const yearNumber = year

  const startDate = new Date(yearNumber, 0, 1) // 1º Jan
  const endDate = new Date(yearNumber + 1, 0, 1) // 1º Jan do próximo ano

  const cooks = await prisma.cozinheiro.findMany({
    select: {
      id: true,
      nome: true,
      receitas: {
        where: {
          dt_criacao: {
            gte: startDate,
            lt: endDate,
          },
        },
        select: {
          id: true,
        },
      },
    },
  })

  const cooksWithCount = cooks.map(cook => ({
    id: cook.id,
    nome: cook.nome,
    ano: String(yearNumber),
    receitasCount: cook.receitas.length,
  }))

  // Descobrir o maior número de receitas
  const maxReceitas = Math.max(...cooksWithCount.map(c => c.receitasCount))

  // Filtrar apenas os campeões (os que têm o maior número)
  return cooksWithCount
    .filter(c => c.receitasCount === maxReceitas)
    .sort((a, b) => b.receitasCount - a.receitasCount) // opcional: manter ordenado
}

export async function getCooksById(id: string) {
  return prisma.cozinheiro.findUnique({ where: { id: Number(id) } })
}

export async function updateCooks(id: string, data: UpdateCooksInput) {
  if (data.restauranteId) {
    const findRestaurante = await prisma.restaurante.findUnique({
      where: {
        id: data.restauranteId,
      },
    })

    if (!findRestaurante) {
      throw new NotFoundError('Restaurante não encontrado')
    }
  }

  return prisma.cozinheiro.update({ where: { id: Number(id) }, data })
}

export async function deleteCooks(id: string) {
  return prisma.cozinheiro.delete({ where: { id: Number(id) } })
}
