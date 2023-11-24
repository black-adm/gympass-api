import { FastifyReply, FastifyRequest } from 'fastify'
import { MemberAlreadyExistsError } from '@/use-cases/errors/member-already-exists-error'
import { MakeRegisterUseCase } from '@/use-cases/factories/make-register-use-case'
import { z } from 'zod'

export async function register(request: FastifyRequest, reply: FastifyReply) {
  const registerBodySchema = z.object({
    name: z.string(),
    email: z.string().email(),
    password: z.string().min(6),
  })

  const { name, email, password } = registerBodySchema.parse(request.body)

  try {
    const registerUseCase = MakeRegisterUseCase()

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
