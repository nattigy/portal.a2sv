import { problemStub } from '../stubs/problem.stub'

export const ProblemServiceMock = {
  createProblem: jest.fn().mockImplementation(dto => problemStub()),
  problem: jest.fn().mockResolvedValue(problemStub()),
  problems: jest.fn().mockResolvedValue([problemStub()]),
  updateProblem: jest.fn().mockResolvedValue(problemStub()),
  removeProblem: jest.fn().mockResolvedValue(1),
}
