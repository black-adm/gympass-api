import { FastifyReply, FastifyRequest } from 'fastify'
import { PrismaMembersRepository } from '@/repositories/prisma/prisma-members-repository'
import { RegisterUseCase } from '@/use-cases/register'
import { z } from 'zod'
import { MemberAlreadyExistsError } from '@/use-cases/errors/member-already-exists-error'

export async function register(request: FastifyRequest, reply: FastifyReply) {
  const registerBodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
  })

  const { name, email, password } = registerBodySchema.parse(request.body)

  try {
    const membersRepository = new PrismaMembersRepository()
    const registerUseCase = new RegisterUseCase(membersRepository)

    await registerUseCase.execute({
      name,
      email,
      password,
    })
  } catch (err) {
    if (err instanceof MemberAlreadyExistsError) {
      return reply.status(409).send({
        message: err.message,
      })
    }

    throw new Error('')
  }

  return reply.status(201).send()
}
