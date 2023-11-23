import { hash } from 'bcryptjs'
import { prisma } from '@/lib/prisma'
import { PrismaMembersRepository } from '@/repositories/prisma-members-repository'

interface RegisterUseCaseRequest {
  name: string
  email: string
  password: string
}

export async function registerUseCase({
  name,
  email,
  password,
}: RegisterUseCaseRequest) {
  const password_hash = await hash(password, 6)
  const memberWithSameEmail = await prisma.member.findUnique({
    where: { email },
  })

  if (memberWithSameEmail) {
    throw new Error('Email already exists!')
  }

  const prismaMembersRepository = new PrismaMembersRepository()

  await prismaMembersRepository.create({
    name,
    email,
    password_hash,
  })
}
