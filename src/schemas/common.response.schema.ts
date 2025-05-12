import { z } from 'zod'

export const commonResponseSchema = {
  400: z.object({
    message: z.string(),
    details: z.any().optional(),
  }),
  404: z.object({
    message: z.string().describe('Recurso não encontrado'),
  }),
  500: z.object({
    message: z.string().describe('Erro interno do servidor'),
  }),
}
