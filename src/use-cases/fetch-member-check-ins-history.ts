import { CheckIn } from '@prisma/client'
import { CheckInsRepository } from '@/repositories/check-ins-repository'

interface FetchMemberCheckInsHistoryUseCaseRequest {
  memberId: string
  page: number
}

interface FetchMemberCheckInsHistoryUseCaseResponse {
  checkIns: CheckIn[]
}

export class FetchMemberCheckInsHistoryUseCase {
  constructor(private checkInsRepository: CheckInsRepository) {}

  async execute({
    memberId,
    page,
  }: FetchMemberCheckInsHistoryUseCaseRequest): Promise<FetchMemberCheckInsHistoryUseCaseResponse> {
    const checkIns = await this.checkInsRepository.findManyByMemberId(
      memberId,
      page,
    )
    return { checkIns }
  }
}
