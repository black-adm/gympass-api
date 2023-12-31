import { FastifyInstance } from 'fastify'
import { register } from './controllers/register'
import { authenticate } from './controllers/authenticate'

export async function routes(app: FastifyInstance) {
  app.post('/members', register)
  app.post('/sessions', authenticate)
}
