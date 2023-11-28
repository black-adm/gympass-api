import { expect, describe, it, beforeEach } from 'vitest'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { SearchGymsUseCase } from '../search-gyms'

let gymsRepository: InMemoryGymsRepository
let sut: SearchGymsUseCase

describe('Search Gyms Use Case', () => {
  beforeEach(async () => {
    gymsRepository = new InMemoryGymsRepository()
    sut = new SearchGymsUseCase(gymsRepository)
  })

  it('should be able to search for gyms', async () => {
    await gymsRepository.create({
      title: 'Academia Garra',
      description: 'Unidade Guarulhos - SP',
      phone: '(11) 2469-6682',
      latitude: -23.4487808,
      longitude: -46.432256,
    })

    await gymsRepository.create({
      title: 'Smart Fit',
      description: 'Unidade Guarulhos - SP',
      phone: '(11) 4002-8922',
      latitude: -23.4487808,
      longitude: -46.432256,
    })

    const { gyms } = await sut.execute({
      query: 'Smart Fit',
      page: 1,
    })

    expect(gyms).toHaveLength(1)
    expect(gyms).toEqual([expect.objectContaining({ title: 'Smart Fit' })])
  })

  it.skip('should be able to fetch paginated gyms search', async () => {
    for (let i = 1; i <= 22; i++) {
      await gymsRepository.create({
        title: `Academia Garra ${i}`,
        description: 'Unidade Guarulhos - SP',
        phone: '(11) 2469-6682',
        latitude: -23.4487808,
        longitude: -46.432256,
      })
    }

    const { gyms } = await sut.execute({
      query: 'Academia Garra',
      page: 2,
    })

    expect(gyms).toHaveLength(2)
    expect(gyms).toEqual([
      expect.objectContaining({ title: 'Academia Garra 21' }),
      expect.objectContaining({ title: 'Academia Garra 22' }),
    ])
  })
})
