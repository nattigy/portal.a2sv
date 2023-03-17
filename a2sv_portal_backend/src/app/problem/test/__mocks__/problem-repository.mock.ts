import { problemStub } from '../stubs/problem.stub'

export const ProblemRepositoryMock = {
  create: jest.fn().mockImplementation(dto => problemStub()),
  count: jest.fn().mockResolvedValue(problemStub()),
  findOne: jest.fn().mockResolvedValue(problemStub()),
  findAll: jest.fn().mockResolvedValue([problemStub()]),
  update: jest.fn().mockResolvedValue(problemStub()),
  remove: jest.fn().mockResolvedValue(problemStub()),
}
