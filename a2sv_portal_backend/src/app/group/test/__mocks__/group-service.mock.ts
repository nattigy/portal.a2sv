/* eslint-disable no-undef */
import { groupStub } from '../stubs/group.stub'

export const GroupServiceMock = {
  createGroup: jest.fn().mockImplementation(() => groupStub()),
  group: jest.fn().mockResolvedValue(groupStub()),
  groups: jest.fn().mockResolvedValue([groupStub()]),
  updateGroup: jest.fn().mockResolvedValue(groupStub()),
  removeGroup: jest.fn().mockResolvedValue(1),
}
