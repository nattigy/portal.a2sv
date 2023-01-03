import { topicStub } from '../stubs/topic.stub'
export const TopicServiceMock = {
    createTopic: jest.fn().mockImplementation((dto) => topicStub()),
    topic: jest.fn().mockResolvedValue(topicStub()),
    topics: jest.fn().mockResolvedValue([topicStub()]),
    updateTopic: jest.fn().mockResolvedValue(topicStub()),
    removeTopic: jest.fn().mockResolvedValue(topicStub)
  }
  