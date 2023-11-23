export class MemberAlreadyExistsError extends Error {
  constructor() {
    super('E-mail already exists!')
  }
}
