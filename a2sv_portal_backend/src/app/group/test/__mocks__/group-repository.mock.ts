/* eslint-disable no-undef */
import { groupStub } from '../stubs/group.stub'

export const GroupRepositoryMock = {
 

   create: jest.fn().mockImplementation((dto) => groupStub()),
    count: jest.fn().mockResolvedValue(groupStub()),
    findOne: jest.fn().mockResolvedValue(groupStub()),
    findAll: jest.fn().mockResolvedValue([groupStub()]),
    update: jest.fn().mockResolvedValue(groupStub()),
    remove: jest.fn().mockResolvedValue(groupStub()),
  }
  