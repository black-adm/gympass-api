import { expect, describe, it, beforeEach } from 'vitest'
import { CheckInUseCase } from '../check-in'
import { InMemoryCheckInsRepository } from '@/repositories/in-memory-members-repository/in-memory-check-ins-repository'

let checkInRepository: InMemoryCheckInsRepository
let sut: CheckInUseCase

describe('Check-in Use Case', () => {
  beforeEach(() => {
    checkInRepository = new InMemoryCheckInsRepository()
    sut = new CheckInUseCase(checkInRepository)
  })

  it('should be able to check in', async () => {
    const { checkIn } = await sut.execute({
      memberId: 'member-01',
      gymId: 'gym-01',
    })

    expect(checkIn.id).toEqual(expect.any(String))
  })
})
