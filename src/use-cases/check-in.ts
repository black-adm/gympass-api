import { CheckInsRepository } from '@/repositories/check-ins-repository'
import { CheckIn } from '@prisma/client'

interface CheckInUseCaseRequest {
  memberId: string
  gymId: string
}

interface CheckInUseCaseResponse {
  checkIn: CheckIn
}

export class CheckInUseCase {
  constructor(private checkInsRepository: CheckInsRepository) {}

  async execute({
    memberId,
    gymId,
  }: CheckInUseCaseRequest): Promise<CheckInUseCaseResponse> {
    const checkInOnSameDay = await this.checkInsRepository.findByMemberIdOnDate(
      memberId,
      new Date(),
    )

    if (checkInOnSameDay) {
      throw new Error('You cannot check in twice on the same day!')
    }

    const checkIn = await this.checkInsRepository.create({
      member_id: memberId,
      gym_id: gymId,
    })

    return { checkIn }
  }
}
