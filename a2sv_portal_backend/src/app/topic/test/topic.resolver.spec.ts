import { Test, TestingModule } from '@nestjs/testing'
import { PaginationTopic } from 'src/common/page/pagination-info'
import { CreateTopicInput } from '../dto/create-topic.input'
import { UpdateTopicInput } from '../dto/update-topic.input'
import { Topic } from '../entities/topic.entity'
import { TopicResolver } from '../topic.resolver'
import { TopicService } from '../topic.service'
import { topicStub } from './stubs/topic.stub'
import { TopicServiceMock } from './__mocks__/topic-service.mock'

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

  describe('createTopic', () => {
    describe('when called should create topic', () => {
      let topic: Topic
      let createTopicDto: CreateTopicInput

      beforeEach(async () => {
        createTopicDto = {
          name: topicStub().name,
          description: topicStub().description,
        }

        topic = await resolver.createTopic(createTopicDto)
      })

      it('should be called woth createTopicDto argument', async () => {
        jest.spyOn(resolver, 'createTopic').getMockImplementation()
        expect(await resolver.createTopic(createTopicDto)).toEqual(topicStub())
        expect(resolver.createTopic).toHaveBeenCalledWith(createTopicDto)
      })

      it('should return a topic', () => {
        expect(topic).toEqual(topicStub())
      })
    })
  })

  describe('topics', () => {
    describe('when called should get topics list', () => {
      let topics: PaginationTopic
      beforeEach(async () => {
        topics = await resolver.topics()
      })

      it('should return list of topics', async () => {
        expect(topics.items).toEqual([topicStub()])
      })
      it('should return a list of length one', () => {
        expect(topics).toHaveLength(1)
      })
    })
  })

  describe('update topic', () => {
    describe('when called should update topic', () => {
      let topic: Topic
      let updateTopicDto: UpdateTopicInput

      beforeEach(async () => {
        updateTopicDto = {
          topicId: topicStub().id,
          name: topicStub().name,
          description: topicStub().description,
        }

        topic = await resolver.updateTopic(updateTopicDto)
      })
      it('should be called with updateTopicDto argument', async () => {
        jest.spyOn(resolver, 'updateTopic').getMockImplementation()
        expect(await resolver.updateTopic(updateTopicDto)).toEqual(topicStub())
        expect(resolver.updateTopic).toHaveBeenCalledWith(updateTopicDto)
      })
      it('should return a topic', () => {
        expect(topic).toEqual(topicStub())
      })
    })
  })

  describe('removeTopic', () => {
    describe('when called should remove topic', () => {
      let result: number

      beforeEach(async () => {
        result = await resolver.removeTopic(topicStub().id)
      })

      it('should be called with topicId argument', async () => {
        jest.spyOn(resolver, 'removeTopic').getMockImplementation()
        expect(await resolver.removeTopic(topicStub().id)).toEqual(1)
        expect(resolver.removeTopic).toHaveBeenCalledWith(topicStub().id)
      })

      it('should return a number', () => {
        expect(result).toEqual(1)
      })
    })
  })
})
