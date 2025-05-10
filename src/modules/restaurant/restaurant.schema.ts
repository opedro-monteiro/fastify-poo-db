import { z } from 'zod'

export const restaurantSchema = z.object({
  id: z.number(),
  nome: z.string(),
  // adicione os outros campos aqui
})
export type Restaurant = z.infer<typeof restaurantSchema>

export const createRestaurantSchema = z.object({
  nome: z.string(),
  // campos obrigatórios
})
export type CreateRestaurantInput = z.infer<typeof createRestaurantSchema>

export const updateRestaurantSchema = createRestaurantSchema.partial()
export type UpdateRestaurantInput = z.infer<typeof updateRestaurantSchema>
