import { expect, describe, it, beforeEach, vi, afterEach } from 'vitest'
import { CheckInUseCase } from '../check-in'
import { InMemoryCheckInsRepository } from '@/repositories/in-memory-members-repository/in-memory-check-ins-repository'

let checkInRepository: InMemoryCheckInsRepository
let sut: CheckInUseCase

describe('Check-in Use Case', () => {
  beforeEach(() => {
    checkInRepository = new InMemoryCheckInsRepository()
    sut = new CheckInUseCase(checkInRepository)
    vi.useFakeTimers()
  })

  afterEach(() => {
    vi.useRealTimers()
  })

  it('should be able to check in', async () => {
    vi.setSystemTime(new Date(2023, 0, 20, 8, 0, 0))

    const { checkIn } = await sut.execute({
      memberId: 'member-01',
      gymId: 'gym-01',
    })

    expect(checkIn.id).toEqual(expect.any(String))
  })

  it('should not be able to check in twice in the same day', async () => {
    vi.setSystemTime(new Date(2023, 0, 20, 8, 0, 0))

    await sut.execute({
      memberId: 'member-01',
      gymId: 'gym-01',
    })

    vi.setSystemTime(new Date(2023, 0, 21, 8, 0, 0))

    const { checkIn } = await sut.execute({
      memberId: 'member-01',
      gymId: 'gym-01',
    })

    expect(checkIn.id).toEqual(expect.any(String))
  })
})
