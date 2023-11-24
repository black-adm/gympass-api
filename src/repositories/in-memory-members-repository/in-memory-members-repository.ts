import { Member, Prisma } from '@prisma/client'
import { MembersRepository } from '../members-repository'

export class InMemoryMembersRepository implements MembersRepository {
  public items: Member[] = []

  async findByEmail(email: string) {
    const member = this.items.find((item) => item.email === email)

    if (!member) {
      return null
    }

    return member
  }

  async create(data: Prisma.MemberCreateInput) {
    const member = {
      id: 'member-1',
      name: data.name,
      email: data.email,
      password_hash: data.password_hash,
      created_at: new Date(),
    }

    this.items.push(member)
    return member
  }
}
