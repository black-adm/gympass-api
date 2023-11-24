import { InMemoryMembersRepository } from '@/repositories/in-memory-members-repository/in-memory-members-repository'
import { expect, describe, it, beforeEach } from 'vitest'
import { AuthenticateUseCase } from '../authenticate'
import { hash } from 'bcryptjs'
import { InvalidCredentialsError } from '../errors/invalid-credentials-error'

let memberRepository: InMemoryMembersRepository
let sut: AuthenticateUseCase

describe('Authenticate Use Case', () => {
  beforeEach(() => {
    memberRepository = new InMemoryMembersRepository()
    sut = new AuthenticateUseCase(memberRepository)
  })

  it('should be able to authenticate', async () => {
    await memberRepository.create({
      name: 'Cristiano Ronaldo',
      email: 'cr7@outlook.com',
      password_hash: await hash('cr72023', 6),
    })

    const { member } = await sut.execute({
      email: 'cr7@outlook.com',
      password: 'cr72023',
    })

    expect(member.id).toEqual(expect.any(String))
  })

  it('should not be able to authenticate with wrong email', async () => {
    await expect(() =>
      sut.execute({
        email: 'cr7@outlook.com',
        password: 'cr72023',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })

  it('should not be able to authenticate with wrong password', async () => {
    await memberRepository.create({
      name: 'Cristiano Ronaldo',
      email: 'cr7@outlook.com',
      password_hash: await hash('cr72023', 6),
    })

    expect(() =>
      sut.execute({
        email: 'cr7@outlook.com',
        password: 'cr7123',
      }),
    ).rejects.toBeInstanceOf(InvalidCredentialsError)
  })
})
