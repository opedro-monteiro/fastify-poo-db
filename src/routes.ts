import { categoryRoutes } from './modules/category/category.routes'
import type { FastifyTypedInstance } from './types'

export async function routes(app: FastifyTypedInstance) {
  app.register(categoryRoutes, { prefix: '/api/v1' })
}
