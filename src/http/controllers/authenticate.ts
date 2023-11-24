import { FastifyReply, FastifyRequest } from 'fastify'
import { PrismaMembersRepository } from '@/repositories/prisma/prisma-members-repository'
import { z } from 'zod'
import { AuthenticateUseCase } from '@/use-cases/authenticate'
import { InvalidCredentialsError } from '@/use-cases/errors/invalid-credentials-error'

export async function authenticate(
  request: FastifyRequest,
  reply: FastifyReply,
) {
  const authenticateBodySchema = z.object({
    email: z.string().email(),
    password: z.string().min(6),
  })

  const { email, password } = authenticateBodySchema.parse(request.body)

  try {
    const membersRepository = new PrismaMembersRepository()
    const authenticateUseCase = new AuthenticateUseCase(membersRepository)

    await authenticateUseCase.execute({
      email,
      password,
    })
  } catch (err) {
    if (err instanceof InvalidCredentialsError) {
      return reply.status(400).send({
        message: err.message,
      })
    }

    throw new Error('')
  }

  return reply.status(200).send()
}
