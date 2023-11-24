import { expect, describe, it } from 'vitest'
import { RegisterUseCase } from './register'
import { compare } from 'bcryptjs'
import { InMemoryMembersRepository } from '@/repositories/in-memory-members-repository/in-memory-members-repository'
import { MemberAlreadyExistsError } from './errors/member-already-exists-error'

describe('Register Use Case', () => {
  it('should hash user password upon registration', async () => {
    const membersRepository = new InMemoryMembersRepository()
    const registerUseCase = new RegisterUseCase(membersRepository)

    const { member } = await registerUseCase.execute({
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
    const membersRepository = new InMemoryMembersRepository()
    const registerUseCase = new RegisterUseCase(membersRepository)

    const email = 'meninodavila@gmail.com'

    await registerUseCase.execute({
      name: 'Neymar Junior',
      email,
      password: 'meninoney2023',
    })

    expect(() =>
      registerUseCase.execute({
        name: 'Neymar Santos',
        email,
        password: 'vilabelmiro2023',
      }),
    ).rejects.toBeInstanceOf(MemberAlreadyExistsError)
  })

  it('should be able to register', async () => {
    const membersRepository = new InMemoryMembersRepository()
    const registerUseCase = new RegisterUseCase(membersRepository)

    const { member } = await registerUseCase.execute({
      name: 'Neymar Junior',
      email: 'meninodavila@gmail.com',
      password: 'meninoney2023',
    })

    expect(member.id).toEqual(expect.any(String))
  })
})
