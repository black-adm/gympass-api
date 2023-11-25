import { expect, describe, it, beforeEach, vi, afterEach } from 'vitest'
import { CheckInUseCase } from '../check-in'
import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository'
import { InMemoryGymsRepository } from '@/repositories/in-memory/in-memory-gyms-repository'
import { Decimal } from '@prisma/client/runtime/library'

let checkInRepository: InMemoryCheckInsRepository
let gymsRepository: InMemoryGymsRepository
let sut: CheckInUseCase

describe('Check-in Use Case', () => {
  beforeEach(() => {
    checkInRepository = new InMemoryCheckInsRepository()
    gymsRepository = new InMemoryGymsRepository()
    sut = new CheckInUseCase(checkInRepository, gymsRepository)

    gymsRepository.items.push({
      id: 'gym-01',
      title: 'Smart Fit',
      description: 'Unidade de Guarulhos - SP',
      phone: '(11) 4002-8922',
      latitude: new Decimal(-23.4487808),
      longitude: new Decimal(-46.432256),
    })

    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('should be able to check in', async () => {
    const { checkIn } = await sut.execute({
      memberId: 'member-01',
      gymId: 'gym-01',
      memberLatitude: -23.4487808,
      memberLongitude: -46.432256,
    })

    expect(checkIn.id).toEqual(expect.any(String))
  })

  it('should not be able to check in twice in the same day', async () => {
    vi.setSystemTime(new Date(2023, 0, 20, 8, 0, 0))

    await sut.execute({
      memberId: 'member-01',
      gymId: 'gym-01',
      memberLatitude: -23.4487808,
      memberLongitude: -46.432256,
    })

    vi.setSystemTime(new Date(2023, 0, 21, 8, 0, 0))

    const { checkIn } = await sut.execute({
      memberId: 'member-01',
      gymId: 'gym-01',
      memberLatitude: -23.4487808,
      memberLongitude: -46.432256,
    })

    expect(checkIn.id).toEqual(expect.any(String))
  })

  it('should not be able to check in on distant gym', async () => {
    gymsRepository.items.push({
      id: 'gym-02',
      title: 'Garra Academia',
      description: 'Unidade de Osasco - SP',
      phone: '(11) 2446-3396',
      latitude: new Decimal(-23.4221509),
      longitude: new Decimal(-46.4110267),
    })

    await expect(() =>
      sut.execute({
        memberId: 'member-01',
        gymId: 'gym-02',
        memberLatitude: -23.4152965,
        memberLongitude: -46.5887649,
      }),
    ).rejects.toBeInstanceOf(Error)
  })
})
