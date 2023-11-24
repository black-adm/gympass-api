import { InMemoryMembersRepository } from '@/repositories/in-memory-members-repository/in-memory-members-repository'
import { expect, describe, it, beforeEach } from 'vitest'
import { hash } from 'bcryptjs'
import { GetMemberProfileUseCase } from '../get-member-profile'
import { ResourceNotFoundError } from '../errors/resource-not-found-error'

let memberRepository: InMemoryMembersRepository
let sut: GetMemberProfileUseCase

describe('Get Member Profile Use Case', () => {
  beforeEach(() => {
    memberRepository = new InMemoryMembersRepository()
    sut = new GetMemberProfileUseCase(memberRepository)
  })

  it('should be able to get member profile', async () => {
    const createdMember = await memberRepository.create({
      name: 'Cristiano Ronaldo',
      email: 'cr7@outlook.com',
      password_hash: await hash('cr72023', 6),
    })

    const { member } = await sut.execute({
      memberId: createdMember.id,
    })

    expect(member.id).toEqual(expect.any(String))
    expect(member.name).toEqual('Cristiano Ronaldo')
  })

  it('should not be able to get member profile with wrong id', async () => {
    await expect(() =>
      sut.execute({
        memberId: 'not-found-id',
      }),
    ).rejects.toBeInstanceOf(ResourceNotFoundError)
  })
})
