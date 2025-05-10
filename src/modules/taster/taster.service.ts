import { prisma } from '../../libs/prisma'
import type { CreateTasterInput, UpdateTasterInput } from './taster.schema'

export async function createTaster(data: CreateTasterInput) {
  return prisma.degustador.create({ data })
}

export async function listTasters() {
  return prisma.degustador.findMany()
}

export async function getTasterById(id: string) {
  return prisma.degustador.findUnique({ where: { id: Number(id) } })
}

export async function updateTaster(id: string, data: UpdateTasterInput) {
  return prisma.degustador.update({ where: { id: Number(id) }, data })
}

export async function deleteTaster(id: string) {
  return prisma.degustador.delete({ where: { id: Number(id) } })
}
