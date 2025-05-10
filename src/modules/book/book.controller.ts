import type { FastifyReply, FastifyRequest } from 'fastify'
import { idParamSchema } from '../../schemas/common.schema'
import { createBookSchema, updateBookSchema } from './book.schema'
import {
  createBook,
  deleteBook,
  getBookById,
  listBooks,
  updateBook,
} from './book.service'

export async function createBookController(
  req: FastifyRequest,
  res: FastifyReply
) {
  const parsed = createBookSchema.safeParse(req.body)

  if (!parsed.success) {
    return res.status(400).send(parsed.error.format())
  }

  const item = await createBook(parsed.data)
  return res.status(201).send(item)
}

export async function listBooksController(
  _: FastifyRequest,
  res: FastifyReply
) {
  const items = await listBooks()
  return res.send(items)
}

export async function getBookByIdController(
  req: FastifyRequest,
  res: FastifyReply
) {
  const parsed = idParamSchema.safeParse(req.params)

  if (!parsed.success) return res.status(400).send(parsed.error.format())

  const { id } = parsed.data

  const item = await getBookById(id)

  if (!item)
    return res.status(404).send({ message: 'Book não encontrado' })

  return res.send(item)
}

export async function updateBookController(
  req: FastifyRequest,
  res: FastifyReply
) {
  const parsed = idParamSchema.safeParse(req.params)

  if (!parsed.success) return res.status(400).send(parsed.error.format())

  const { id } = parsed.data

  const parsedBody = updateBookSchema.safeParse(req.body)

  if (!parsedBody.success)
    return res.status(400).send(parsedBody.error.format())

  const item = await updateBook(id, parsedBody.data)

  return res.send(item)
}

export async function deleteBookController(
  req: FastifyRequest,
  res: FastifyReply
) {
  const parsed = idParamSchema.safeParse(req.params)

  if (!parsed.success) return res.status(400).send(parsed.error.format())

  const { id } = parsed.data

  await deleteBook(id)

  return res.send({ message: 'Book deletado com sucesso' })
}
