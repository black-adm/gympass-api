import { CheckIn, Prisma } from '@prisma/client'

export interface CheckInsRepository {
  create(data: Prisma.CheckInUncheckedCreateInput): Promise<CheckIn>
  countByMemberId(memberId: string): Promise<number>
  findByMemberIdOnDate(memberId: string, date: Date): Promise<CheckIn | null>
  findManyByMemberId(memberId: string, page: number): Promise<CheckIn[]>
}
