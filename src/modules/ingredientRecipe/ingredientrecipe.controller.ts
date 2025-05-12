import type { FastifyReply, FastifyRequest } from 'fastify'
import { NotFoundError } from '../../error'
import { idParamSchema } from '../../schemas/common.schema'
import {
  createIngredientRecipeSchema,
  updateIngredientRecipeSchema,
} from './ingredientrecipe.schema'
import {
  createIngredientRecipe,
  deleteIngredientRecipe,
  getIngredientRecipeById,
  listIngredientRecipes,
  updateIngredientRecipe,
} from './ingredientrecipe.service'

export async function createIngredientRecipeController(
  req: FastifyRequest,
  res: FastifyReply
) {
  try {
    const parsed = createIngredientRecipeSchema.safeParse(req.body)

    if (!parsed.success) {
      return res.status(400).send(parsed.error.format())
    }

    const item = await createIngredientRecipe(parsed.data)
    return res.status(201).send(item)
  } catch (error) {
    if (error instanceof NotFoundError) {
      return res.status(404).send({ message: error.message })
    }

    req.log.error(error)
    return res.status(500).send({ message: 'Erro interno do servidor' })
  }
}

export async function listIngredientRecipesController(
  _: FastifyRequest,
  res: FastifyReply
) {
  const items = await listIngredientRecipes()
  return res.send(items)
}

export async function getIngredientRecipeByIdController(
  req: FastifyRequest,
  res: FastifyReply
) {
  const parsed = idParamSchema.safeParse(req.params)

  if (!parsed.success) return res.status(400).send(parsed.error.format())

  const { id } = parsed.data

  const item = await getIngredientRecipeById(id)

  if (!item)
    return res.status(404).send({ message: 'IngredientRecipe não encontrado' })

  return res.send(item)
}

export async function updateIngredientRecipeController(
  req: FastifyRequest,
  res: FastifyReply
) {
  try {
    const parsed = idParamSchema.safeParse(req.params)

    if (!parsed.success) return res.status(400).send(parsed.error.format())

    const { id } = parsed.data

    const parsedBody = updateIngredientRecipeSchema.safeParse(req.body)

    if (!parsedBody.success)
      return res.status(400).send(parsedBody.error.format())

    const item = await updateIngredientRecipe(id, parsedBody.data)

    return res.send(item)
  } catch (error) {
    if (error instanceof NotFoundError) {
      return res.status(404).send({ message: error.message })
    }

    req.log.error(error)
    return res.status(500).send({ message: 'Erro interno do servidor' })
  }
}

export async function deleteIngredientRecipeController(
  req: FastifyRequest,
  res: FastifyReply
) {
  const parsed = idParamSchema.safeParse(req.params)

  if (!parsed.success) return res.status(400).send(parsed.error.format())

  const { id } = parsed.data

  await deleteIngredientRecipe(id)

  return res.send({ message: 'IngredientRecipe deletado com sucesso' })
}
