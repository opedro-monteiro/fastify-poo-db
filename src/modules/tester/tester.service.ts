import { NotFoundError } from '../../error'
import { prisma } from '../../libs/prisma'
import type { CreateTesterInput, UpdateTesterInput } from './tester.schema'

export async function createTester(data: CreateTesterInput) {
  const receita = await prisma.receita.findUnique({
    where: { id: data.receitaId },
  })

  if (!receita) {
    throw new NotFoundError('Receita não encontrada')
  }

  const degustador = await prisma.degustador.findUnique({
    where: { id: data.degustadorId },
  })

  if (!degustador) {
    throw new NotFoundError('Degustador não encontrado')
  }

  return prisma.teste.create({ data })
}

export async function listTesters() {
  return prisma.teste.findMany()
}

export async function getTesterById(id: string) {
  return prisma.teste.findUnique({ where: { id: Number(id) } })
}

export async function updateTester(id: string, data: UpdateTesterInput) {
  return prisma.teste.update({ where: { id: Number(id) }, data })
}

export async function deleteTester(id: string) {
  return prisma.teste.delete({ where: { id: Number(id) } })
}
