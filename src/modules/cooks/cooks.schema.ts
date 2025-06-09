import { z } from 'zod'
import { NotFoundError } from './../../error'

export const cooksSchema = z.object({
  id: z.number(),
  nome: z.string(),
  rg: z.string(),
  salario: z.coerce.number(),
  dt_contrato: z.coerce.date(),
  nome_fantasia: z.string().nullable(),
  restauranteId: z.coerce.number().nullable(),
})
export type Cooks = z.infer<typeof cooksSchema>

export const createCooksSchema = z.object({
  nome: z.string(),
  rg: z.string(),
  salario: z.coerce.number(),
  dt_contrato: z.coerce.date(),
  nome_fantasia: z.string().nullable(),
  restauranteId: z.coerce.number().nullable(),
})
export type CreateCooksInput = z.infer<typeof createCooksSchema>

export const updateCooksSchema = createCooksSchema.partial()
export type UpdateCooksInput = z.infer<typeof updateCooksSchema>

export const listCooksRankingsQuerySchema = z.object({
  search: z.string().optional(),
  page: z.coerce.number().int().min(1).default(1),
  limit: z.coerce.number().int().min(1).max(100).default(10),
  ingredients: z
    .union([z.string(), z.array(z.string())])
    .transform(val => (typeof val === 'string' ? [val] : val))
    .optional(),
  categories: z
    .union([z.string(), z.array(z.string())])
    .transform(val => (typeof val === 'string' ? [val] : val))
    .optional(),
  dtContract: z.coerce.date().optional(),
  sortBy: z.enum(['nome', 'dt_criacao']).default('nome'),
  sortOrder: z.enum(['asc', 'desc']).default('asc'),
})

export type ListCooksRankingsQuery = z.infer<
  typeof listCooksRankingsQuerySchema
>

export const listCooksRankingsByYearQuerySchema = z.object({
  year: z.coerce.number().int(),
})

export type ListCooksRankingsByYearQuery = z.infer<
  typeof listCooksRankingsByYearQuerySchema
>

export const cooksRankingSchemaByYear = z.object({
  id: z.number(),
  nome: z.string(),
  ano: z.string(),
  receitasCount: z.coerce.number().int().nonnegative(),
})

export type CooksRankingByYear = z.infer<typeof cooksRankingSchemaByYear>

export const CooksDetailedSchema = z.object({
  nome: z.string(),
  dataContrato: z.string(),
  restauranteOrigem: z.string(),
  receitas: z.array(
    z.object({
      categoria: z.string(),
      nome: z.string(),
      dataCriacao: z.string(),
      livros: z.array(z.string()),
    })
  ),
})

export type CooksDetailed = z.infer<typeof CooksDetailedSchema>
