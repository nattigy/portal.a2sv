/* eslint-disable no-undef */
import { userStub } from '../stubs/user.stub'

export const UserServiceMock = {
  createUser: jest.fn().mockImplementation(dto => userStub()),
  getMe: jest.fn().mockResolvedValue(userStub()),
  user: jest.fn().mockResolvedValue(userStub()),
  users: jest.fn().mockResolvedValue([userStub()]),
  findUserByPhone: jest.fn().mockResolvedValue(userStub()),
  changePassword: jest.fn().mockResolvedValue(userStub()),
  updateUser: jest.fn().mockResolvedValue(userStub()),
}
