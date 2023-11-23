import { prisma } from '@/lib/prisma'
import { Prisma } from '@prisma/client'

export class PrismaMembersRepository {
  async create(data: Prisma.MemberCreateInput) {
    const member = await prisma.member.create({
      data,
    })

    return member
  }
}
