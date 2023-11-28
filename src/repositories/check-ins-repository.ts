import { CheckIn, Prisma } from '@prisma/client'

export interface CheckInsRepository {
  create(data: Prisma.CheckInUncheckedCreateInput): Promise<CheckIn>
  findByMemberIdOnDate(memberId: string, date: Date): Promise<CheckIn | null>
  findManyByMemberId(memberId: string, page: number): Promise<CheckIn[]>
}
