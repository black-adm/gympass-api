import { hash } from 'bcryptjs'
import { MembersRepository } from './members-repository'

interface RegisterUseCaseRequest {
  name: string
  email: string
  password: string
}

export class RegisterUseCase {
  constructor(private membersRepository: MembersRepository) {}

  async execute({ name, email, password }: RegisterUseCaseRequest) {
    const password_hash = await hash(password, 6)
    const memberWithSameEmail = await this.membersRepository.findByEmail(email)

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
