import { expect, describe, it } from 'vitest'
import { RegisterUseCase } from './register'
import { compare } from 'bcryptjs'

describe('Register Use Case', () => {
  it('should hash user password upon registration', async () => {
    const registerUseCase = new RegisterUseCase({
      async findByEmail(email) {
        return null
      },

      async create(data) {
        return {
          id: 'member-1',
          name: data.name,
          email: data.email,
          password_hash: data.password_hash,
          created_at: new Date(),
        }
      },
    })

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
})
