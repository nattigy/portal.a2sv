import { Test, TestingModule } from '@nestjs/testing'
import { TopicService } from '../topic.service'
import { TopicRepository } from '../topic.repository'
import { TopicRepositoryMock } from './__mocks__/topic-repository.mock'
import { createTopicStub, topicStub, updateTopicStub } from './stubs/topic.stub'
import { Topic } from '../entities/topic.entity'
import { CreateTopicInput } from '../dto/create-topic.input'
import { PaginationTopic } from 'src/common/page/pagination-info'
import { UpdateTopicInput } from '../dto/update-topic.input'
describe('TopicService', () => {
  let service: TopicService
  // const mockTopicRepository = {
  //   create: jest.fn().mockImplementation(dto => dto)
  // };
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TopicService, TopicRepository],
    })
      .overrideProvider(TopicRepository)
      .useValue(TopicRepositoryMock)
      .compile()

    service = module.get<TopicService>(TopicService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })

  describe('create', () => {
    describe('when given needed fields it should create topic', () => {
      let topic: Topic
      let createTopicDto: CreateTopicInput

      beforeEach(async () => {
        createTopicDto = {
          name: topicStub().name,
          description: topicStub().description,
        }
        topic = await service.create(createTopicDto)
      })
      it('should be called with createTopicDto argument', async () => {
        jest.spyOn(service, 'create').getMockImplementation()
        expect(await service.create(createTopicDto)).toEqual(topicStub())
        expect(service.create).toHaveBeenCalledWith(createTopicDto)
      })

      it('should return a topic', () => {
        expect(topic).toEqual(topicStub())
      })
    })
  })

  describe('topic', () => {
    describe('when called should return a topic', () => {
      let topic: Topic

      beforeEach(async () => {
        topic = await service.topic(topicStub().id)
      })

      it('should be called with topicId argument', async () => {
        jest.spyOn(service, 'topic').getMockImplementation()
        expect(await service.topic(topicStub().id)).toEqual(topicStub())
        expect(service.topic).toHaveBeenCalledWith(topicStub().id)
      })

      it('should return a topic', async () => {
        expect(topic).toEqual(topicStub())
      })
    })
  })

  describe('topics', () => {
    describe('when called it should return all topics', () => {
      let topics: PaginationTopic
      beforeEach(async () => {
        topics = await service.topics({})
      })

      it('should return list of topics', async () => {
        expect(topics.items).toEqual([topicStub()])
      })

      it('should return a list of length one', () => {
        expect(topics).toHaveLength(1)
      })
    })
  })

  describe('update', () => {
    describe('when topic with id exist it should update the topic', () => {
      let topic: Topic
      let updateTopicDto: UpdateTopicInput

      beforeEach(async () => {
        updateTopicDto = {
          topicId: topicStub().id,
          name: topicStub().name,
          description: topicStub().description,
        }
        topic = await service.updateTopic(updateTopicDto)
      })
      it('should be called with updateTopicDto argument', async () => {
        jest.spyOn(service, 'updateTopic').getMockImplementation()
        expect(await service.updateTopic(updateTopicDto)).toEqual(topicStub())
        expect(service.updateTopic).toHaveBeenCalledWith(updateTopicDto)
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
        result = await service.removeTopic(topicStub().id)
      })

      it('should be called with topicId argument', async () => {
        jest.spyOn(service, 'removeTopic').getMockImplementation()
        expect(await service.removeTopic(topicStub().id)).toEqual(1)
        expect(service.removeTopic).toHaveBeenCalledWith(topicStub().id)
      })

      it('should return a number', () => {
        expect(result).toEqual(1)
      })
    })
  })
})
