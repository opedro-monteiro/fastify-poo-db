import { bookRoutes } from './modules/book/book.routes'
import { categoryRoutes } from './modules/category/category.routes'
import { ingredientRoutes } from './modules/ingredient/ingredient.routes'
import { restaurantRoutes } from './modules/restaurant/restaurant.routes'
import type { FastifyTypedInstance } from './types'

export async function routes(app: FastifyTypedInstance) {
  app.register(categoryRoutes, { prefix: '/api/v1' })
  app.register(ingredientRoutes, { prefix: '/api/v1' })
  app.register(bookRoutes, { prefix: '/api/v1' })
  app.register(restaurantRoutes, { prefix: '/api/v1' })
}
