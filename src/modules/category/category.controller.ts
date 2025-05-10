import type { FastifyReply, FastifyRequest } from 'fastify'
import { idParamSchema } from '../../schemas/common.schema'
import { createCategorySchema, updateCategorySchema } from './category.schema'
import {
  createCategory,
  deleteCategory,
  getCategoryById,
  listCategorys,
  updateCategory,
} from './category.service'

export async function createCategoryController(
  req: FastifyRequest,
  res: FastifyReply
) {
  const parsed = createCategorySchema.safeParse(req.body)
  if (!parsed.success) {
    return res
      .status(400)
      .send({ message: 'Dados inválidos', issues: parsed.error.format() })
  }

  const item = await createCategory(parsed.data)
  return res.status(201).send(item)
}

export async function listCategorysController(
  _: FastifyRequest,
  res: FastifyReply
) {
  const items = await listCategorys()
  return res.send(items)
}

export async function getCategoryByIdController(
  req: FastifyRequest,
  res: FastifyReply
) {
  const parsed = idParamSchema.safeParse(req.params)
  if (!parsed.success) return res.status(400).send({ message: 'ID inválido' })

  const { id } = parsed.data
  const item = await getCategoryById(id)

  if (!item)
    return res.status(404).send({ message: 'Categoria não encontrada' })

  return res.send(item)
}

export async function updateCategoryController(
  req: FastifyRequest,
  res: FastifyReply
) {
  const parsed = idParamSchema.safeParse(req.params)
  if (!parsed.success) return res.status(400).send({ message: 'ID inválido' })

  const parsedBody = updateCategorySchema.safeParse(req.body)
  if (!parsedBody.success)
    return res
      .status(400)
      .send({ message: 'Dados inválidos', issues: parsedBody.error.format() })

  const item = await updateCategory(parsed.data.id, parsedBody.data)
  return res.send(item)
}

export async function deleteCategoryController(
  req: FastifyRequest,
  res: FastifyReply
) {
  const parsed = idParamSchema.safeParse(req.params)
  if (!parsed.success) return res.status(400).send({ message: 'ID inválido' })

  await deleteCategory(parsed.data.id)
  return res.send({ message: 'Categoria deletada com sucesso' })
}
