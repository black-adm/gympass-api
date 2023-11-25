import { expect, describe, it, beforeEach } from 'vitest'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { GymUseCase } from '../create-gym'

let gymsRepository: InMemoryGymsRepository
let sut: GymUseCase

describe('Register Use Case', () => {
  beforeEach(() => {
    gymsRepository = new InMemoryGymsRepository()
    sut = new GymUseCase(gymsRepository)
  })

  it('should be able to create gym', async () => {
    const { gym } = await sut.execute({
      title: 'Smart Fit',
      description: 'Unidade Guarulhos - SP',
      phone: '(11) 4002-8922',
      latitude: -23.4487808,
      longitude: -46.432256,
    })

    expect(gym.id).toEqual(expect.any(String))
  })
})
