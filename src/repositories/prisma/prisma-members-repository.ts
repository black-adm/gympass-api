import { prisma } from '@/lib/prisma'
import { MembersRepository } from '@/use-cases/members-repository'
import { Prisma } from '@prisma/client'

export class PrismaMembersRepository implements MembersRepository {
  async create(data: Prisma.MemberCreateInput) {
    const member = await prisma.member.create({
      data,
    })

    return member
  }

  async findByEmail(email: string) {
    const member = await prisma.member.findUnique({
      where: { email },
    })
    return member
  }
}
