import { hash } from 'bcryptjs'
import { prisma } from '@/lib/prisma'

interface RegisterUseCaseRequest {
  name: string
  email: string
  password: string
}

export class RegisterUseCase {
  constructor(private membersRepository: any) {}

  async execute({ name, email, password }: RegisterUseCaseRequest) {
    const password_hash = await hash(password, 6)
    const memberWithSameEmail = await prisma.member.findUnique({
      where: { email },
    })

    if (memberWithSameEmail) {
      throw new Error('Email already exists!')
    }

    await this.membersRepository.create({
      name,
      email,
      password_hash,
    })
  }
}
