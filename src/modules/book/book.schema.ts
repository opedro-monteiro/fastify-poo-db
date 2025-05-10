import { z } from 'zod'

export const bookSchema = z.object({
  id: z.number(),
  titulo: z.string(),
  isbn: z.string(),
})
export type Book = z.infer<typeof bookSchema>

export const createBookSchema = z.object({
  titulo: z.string().min(1, 'Título é obrigatório'),
  isbn: z.string().min(1, 'ISBN é obrigatório'),
})
export type CreateBookInput = z.infer<typeof createBookSchema>

export const updateBookSchema = createBookSchema.partial()
export type UpdateBookInput = z.infer<typeof updateBookSchema>
