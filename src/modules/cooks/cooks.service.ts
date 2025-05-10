import { prisma } from '../../libs/prisma'
import type { CreateCooksInput, UpdateCooksInput } from './cooks.schema'

export async function createCooks(data: CreateCooksInput) {
  return prisma.cozinheiro.create({ data })
}

export async function listCooks() {
  return prisma.cozinheiro.findMany()
}

export async function getCooksById(id: string) {
  return prisma.cozinheiro.findUnique({ where: { id: Number(id) } })
}

export async function updateCooks(id: string, data: UpdateCooksInput) {
  return prisma.cozinheiro.update({ where: { id: Number(id) }, data })
}

export async function deleteCooks(id: string) {
  return prisma.cozinheiro.delete({ where: { id: Number(id) } })
}
