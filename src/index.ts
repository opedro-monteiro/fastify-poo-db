import Fastify from 'fastify'
import { env } from './env'
const app = Fastify({
  logger: true
})

// Declare a route
app.get('/', async function handler (request, reply) {
  return { hello: 'world' }
})

// Run the server!
app.listen({ port: env.PORT }).then(() => {
    console.log(`Server running on ${env.PORT}`)
  })