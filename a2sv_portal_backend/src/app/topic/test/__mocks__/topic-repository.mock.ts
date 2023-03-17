import { topicStub } from '../stubs/topic.stub'

export const TopicRepositoryMock = {
  create: jest.fn().mockImplementation(dto => topicStub()),
  count: jest.fn().mockResolvedValue(topicStub()),
  findOne: jest.fn().mockResolvedValue(topicStub()),
  findAll: jest.fn().mockResolvedValue([topicStub()]),
  update: jest.fn().mockResolvedValue(topicStub()),
  remove: jest.fn().mockResolvedValue(topicStub()),
}
