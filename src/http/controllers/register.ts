import { FastifyReply, FastifyRequest } from 'fastify'
import { RegisterUseCase } from '@/use-cases/register'
import { z } from 'zod'
import { PrismaMembersRepository } from '@/repositories/prisma-members-repository'

export async function register(request: FastifyRequest, reply: FastifyReply) {
  const registerBodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
  })

  const { name, email, password } = registerBodySchema.parse(request.body)

  try {
    const prismaMembersRepository = new PrismaMembersRepository()
    const registerUseCase = new RegisterUseCase(prismaMembersRepository)

    await registerUseCase.execute({
      name,
      email,
      password,
    })
  } catch (err) {
    return reply.status(409).send()
  }

  return reply.status(201).send()
}
