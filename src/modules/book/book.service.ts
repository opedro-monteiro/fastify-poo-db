import { prisma } from '../../libs/prisma'
import type { CreateBookInput, UpdateBookInput } from './book.schema'

export async function createBook(data: CreateBookInput) {
  return prisma.livro.create({ data })
}

export async function listBooks() {
  return prisma.livro.findMany()
}

export async function getBookById(id: string) {
  return prisma.livro.findUnique({ where: { id: Number(id) } })
}

export async function updateBook(id: string, data: UpdateBookInput) {
  return prisma.livro.update({ where: { id: Number(id) }, data })
}

export async function deleteBook(id: string) {
  return prisma.livro.delete({ where: { id: Number(id) } })
}
