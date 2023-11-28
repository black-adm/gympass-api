import { CheckInsRepository } from '@/repositories/check-ins-repository'

interface GetMemberMetricsUseCaseRequest {
  memberId: string
}

interface GetMemberMetricsUseCaseResponse {
  checkInsCount: number
}

export class GetMemberMetricsUseCase {
  constructor(private checkInsRepository: CheckInsRepository) {}

  async execute({
    memberId,
  }: GetMemberMetricsUseCaseRequest): Promise<GetMemberMetricsUseCaseResponse> {
    const checkInsCount =
      await this.checkInsRepository.countByMemberId(memberId)
    return { checkInsCount }
  }
}
