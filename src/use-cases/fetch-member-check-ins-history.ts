import { CheckIn } from '@prisma/client'
import { CheckInsRepository } from '@/repositories/check-ins-repository'

interface FetchMemberCheckInsHistoryUseCaseRequest {
  memberId: string
}

interface FetchMemberCheckInsHistoryUseCaseResponse {
  checkIns: CheckIn[]
}

export class FetchMemberCheckInsHistoryUseCase {
  constructor(private checkInsRepository: CheckInsRepository) {}

  async execute({
    memberId,
  }: FetchMemberCheckInsHistoryUseCaseRequest): Promise<FetchMemberCheckInsHistoryUseCaseResponse> {
    const checkIns = await this.checkInsRepository.findManyByMemberId(memberId)
    return { checkIns }
  }
}
