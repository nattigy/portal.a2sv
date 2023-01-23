import { userStub } from '../stubs/user.stub'

export const UserRepositoryMock = {
  create: jest.fn().mockImplementation((dto) => userStub()),
  count: jest.fn().mockResolvedValue(userStub()),
  findOne: jest.fn().mockResolvedValue(userStub()),
  findAll: jest.fn().mockResolvedValue([userStub()]),
  update: jest.fn().mockResolvedValue(userStub()),
  upsert: jest.fn().mockResolvedValue(userStub()),
  remove: jest.fn().mockResolvedValue(userStub()),
}
