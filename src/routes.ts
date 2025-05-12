import { bookRoutes } from './modules/book/book.routes'
import { categoryRoutes } from './modules/category/category.routes'
import { cooksRoutes } from './modules/cooks/cooks.routes'
import { editorRoutes } from './modules/editor/editor.routes'
import { ingredientRoutes } from './modules/ingredient/ingredient.routes'
import { recipeRoutes } from './modules/recipe/recipe.routes'
import { restaurantRoutes } from './modules/restaurant/restaurant.routes'
import { tasterRoutes } from './modules/taster/taster.routes'
import { testerRoutes } from './modules/tester/tester.routes'
import type { FastifyTypedInstance } from './types'

export async function routes(app: FastifyTypedInstance) {
  app.register(bookRoutes, { prefix: '/api/v1' })
  app.register(cooksRoutes, { prefix: '/api/v1' })
  app.register(tasterRoutes, { prefix: '/api/v1' })
  app.register(recipeRoutes, { prefix: '/api/v1' })
  app.register(testerRoutes, { prefix: '/api/v1' })
  app.register(editorRoutes, { prefix: '/api/v1' })
  app.register(categoryRoutes, { prefix: '/api/v1' })
  app.register(ingredientRoutes, { prefix: '/api/v1' })
  app.register(restaurantRoutes, { prefix: '/api/v1' })
}
