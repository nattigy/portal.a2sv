import { Test, TestingModule } from '@nestjs/testing'
import { TopicResolver } from '../topic.resolver'
import { TopicService } from '../topic.service'
import { createTopicStub, topicStub, updateTopicStub } from './stubs/topic.stub'
import { TopicServiceMock } from './_mocks/topic-service.mock'
describe('TopicResolver', () => {
  let resolver: TopicResolver

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TopicResolver, TopicService],
    })
      .overrideProvider(TopicService)
      .useValue(TopicServiceMock)
      .compile()

    resolver = module.get<TopicResolver>(TopicResolver)
  })

  it('should be defined', () => {
    expect(resolver).toBeDefined()
  })

  describe('creat topic', () => {
    describe('when called', () => {
      it('should create a new topic', async () => {
        const topic = await resolver.createTopic(createTopicStub())
        expect(topic).toEqual(topicStub())
      })
    })

    expect(TopicServiceMock.createTopic).toHaveBeenCalled()
  })

  describe('get topics', () => {
    describe('when called', () => {
      it('should get topics list', async () => {
        const topics = await resolver.topics()
        expect(topics).toEqual([topicStub()])
      })
    })
    expect(TopicServiceMock.topics).toHaveBeenCalled()
  })
  describe('update topic', () => {
    describe('when called should update topic', () => {
      it('should update topic', async () => {
        const topic = await resolver.updateTopic(updateTopicStub())
        expect(topic).toEqual(topicStub())
      })
    })

    expect(TopicServiceMock.updateTopic).toHaveBeenCalled()
  })
})
