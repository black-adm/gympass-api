import { PrismaMembersRepository } from '@/repositories/prisma/prisma-members-repository'
import { RegisterUseCase } from '../register'

export function MakeRegisterUseCase() {
  const membersRepository = new PrismaMembersRepository()
  const registerUseCase = new RegisterUseCase(membersRepository)

  return registerUseCase
}
