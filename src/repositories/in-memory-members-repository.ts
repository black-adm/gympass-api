export class InMemoryMembersRepository {
  public members = []

  async create(data) {
    this.members.push(data)
  }
}
