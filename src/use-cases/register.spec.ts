import { expect, describe, it, beforeEach } from 'vitest'
import { RegisterUseCase } from './register'
import { compare } from 'bcryptjs'
import { InMemoryMembersRepository } from '@/repositories/in-memory-members-repository/in-memory-members-repository'
import { MemberAlreadyExistsError } from './errors/member-already-exists-error'

let membersRepository: InMemoryMembersRepository
let sut: RegisterUseCase

describe('Register Use Case', () => {
  beforeEach(() => {
    membersRepository = new InMemoryMembersRepository()
    sut = new RegisterUseCase(membersRepository)
  })

  it('should hash user password upon registration', async () => {
    const { member } = await sut.execute({
      name: 'Neymar Junior',
      email: 'meninodavila@gmail.com',
      password: 'meninoney2023',
    })

    const isPasswordCorrectlyHashed = await compare(
      'meninoney2023',
      member.password_hash,
    )

    expect(isPasswordCorrectlyHashed).toBe(true)
  })

  it('should not be able to register with same email twice', async () => {
    const email = 'meninodavila@gmail.com'

    await sut.execute({
      name: 'Neymar Junior',
      email,
      password: 'meninoney2023',
    })

    await expect(() =>
      sut.execute({
        name: 'Neymar Santos',
        email,
        password: 'vilabelmiro2023',
      }),
    ).rejects.toBeInstanceOf(MemberAlreadyExistsError)
  })

  it('should be able to register', async () => {
    const { member } = await sut.execute({
      name: 'Neymar Junior',
      email: 'meninodavila@gmail.com',
      password: 'meninoney2023',
    })

    expect(member.id).toEqual(expect.any(String))
  })
})
