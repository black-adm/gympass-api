import { prisma } from '@/lib/prisma'
import { Prisma } from '@prisma/client'
import { MembersRepository } from '../members-repository'

export class PrismaMembersRepository implements MembersRepository {
  async create(data: Prisma.MemberCreateInput) {
    const member = await prisma.member.create({
      data,
    })

    return member
  }

  async findById(id: string) {
    const member = await prisma.member.findUnique({
      where: { id },
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
