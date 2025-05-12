import { z } from 'zod'

export const editorSchema = z.object({
  id: z.number(),
  rg: z.string(),
  nome: z.string(),
  salario: z.number(),
  dt_contrato: z.coerce.date(),
})
export type Editor = z.infer<typeof editorSchema>

export const createEditorSchema = z.object({
  rg: z.string(),
  nome: z.string(),
  salario: z.number(),
  dt_contrato: z.coerce.date(),
})
export type CreateEditorInput = z.infer<typeof createEditorSchema>

export const updateEditorSchema = createEditorSchema.partial()
export type UpdateEditorInput = z.infer<typeof updateEditorSchema>
