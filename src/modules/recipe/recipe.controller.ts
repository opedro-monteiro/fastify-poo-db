import type { FastifyReply, FastifyRequest } from 'fastify'
import { NotFoundError } from '../../error'
import { idParamSchema } from '../../schemas/common.schema'
import { createRecipeSchema, listRecipesQuerySchema, updateRecipeSchema } from './recipe.schema'
import {
  createRecipe,
  deleteRecipe,
  getRecipeById,
  listRecipes,
  updateRecipe,
} from './recipe.service'

export async function createRecipeController(
  req: FastifyRequest,
  res: FastifyReply
) {
  try {
    const parsed = createRecipeSchema.safeParse(req.body)

    if (!parsed.success) {
      return res.status(400).send(parsed.error.format())
    }

    const item = await createRecipe(parsed.data)
    return res.status(201).send(item)
  } catch (error) {
    if (error instanceof NotFoundError) {
      return res.status(404).send({ message: error.message })
    }

    req.log.error(error)
    return res.status(500).send({ message: 'Erro interno do servidor' })
  }
}

export async function listRecipesController(
  req: FastifyRequest,
  res: FastifyReply
) {

  const parsed = listRecipesQuerySchema.safeParse(req.query);

  if (!parsed.success) {
    return res.status(400).send({ error: parsed.error.flatten() });
  }

  const filters = parsed.data;
  const items = await listRecipes(filters)

  return res.send(items);
}

export async function getRecipeByIdController(
  req: FastifyRequest,
  res: FastifyReply
) {
  const parsed = idParamSchema.safeParse(req.params)

  if (!parsed.success) return res.status(400).send(parsed.error.format())

  const { id } = parsed.data

  const item = await getRecipeById(id)

  if (!item) return res.status(404).send({ message: 'Recipe não encontrado' })

  return res.send(item)
}

export async function updateRecipeController(
  req: FastifyRequest,
  res: FastifyReply
) {
  try {
    const parsed = idParamSchema.safeParse(req.params)

    if (!parsed.success) return res.status(400).send(parsed.error.format())

    const { id } = parsed.data

    const parsedBody = updateRecipeSchema.safeParse(req.body)

    if (!parsedBody.success)
      return res.status(400).send(parsedBody.error.format())

    const item = await updateRecipe(id, parsedBody.data)

    return res.send(item)
  } catch (error) {
    if (error instanceof NotFoundError) {
      return res.status(404).send({ message: error.message })
    }

    req.log.error(error)
    return res.status(500).send({ message: 'Erro interno do servidor' })
  }
}

export async function deleteRecipeController(
  req: FastifyRequest,
  res: FastifyReply
) {
  const parsed = idParamSchema.safeParse(req.params)

  if (!parsed.success) {
    return res.status(400).send({
      message: 'Parâmetros inválidos.',
    })
  }

  const { id } = parsed.data

  try {
    await deleteRecipe(id)
    return res.status(200).send({ message: 'Receita deletada com sucesso.' })
  } catch (error) {
    return res.status(400).send({
      message: (error as Error).message ?? 'Erro ao deletar receita.',
    })
  }
}
