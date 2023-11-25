import { CheckInsRepository } from '@/repositories/check-ins-repository'
import { GymsRepository } from '@/repositories/gyms-repository'
import { CheckIn } from '@prisma/client'
import { ResourceNotFoundError } from './errors/resource-not-found-error'

interface CheckInUseCaseRequest {
  memberId: string
  gymId: string
  memberLatitude: number
  memberLongitude: number
}

interface CheckInUseCaseResponse {
  checkIn: CheckIn
}

export class CheckInUseCase {
  constructor(
    private checkInsRepository: CheckInsRepository,
    private gymsRepository: GymsRepository,
  ) {}

  async execute({
    memberId,
    gymId,
  }: CheckInUseCaseRequest): Promise<CheckInUseCaseResponse> {
    const gym = await this.gymsRepository.findById(gymId)

    if (!gymId) {
      throw new ResourceNotFoundError()
    }

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
