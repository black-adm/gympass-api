import { expect, describe, it, beforeEach } from 'vitest'
import { InMemoryCheckInsRepository } from '@/repositories/in-memory/in-memory-check-ins-repository'
import { GetMemberMetricsUseCase } from '../get-member-metrics'

let checkInsRepository: InMemoryCheckInsRepository
let sut: GetMemberMetricsUseCase

describe('Get Member Metrics Use Case', () => {
  beforeEach(async () => {
    checkInsRepository = new InMemoryCheckInsRepository()
    sut = new GetMemberMetricsUseCase(checkInsRepository)
  })

  it('should be able to get check-ins count from metrics', async () => {
    await checkInsRepository.create({
      gym_id: 'gym-01',
      member_id: 'member-01',
    })

    await checkInsRepository.create({
      gym_id: 'gym-02',
      member_id: 'member-01',
    })

    const { checkInsCount } = await sut.execute({
      memberId: 'member-01',
    })

    expect(checkInsCount).toEqual(2)
  })
})
