import { Test, TestingModule } from '@nestjs/testing'
import { TopicService } from '../topic.service'
import { TopicRepository } from '../topic.repository'
import { TopicRepositoryMock } from './_mocks/topic-repository.mock'
import { createTopicStub, topicStub, updateTopicStub } from './stubs/topic.stub'
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
    describe('when given needed fields', () => {
      it('should create topic', async () => {
        const topicResult = await service.create(createTopicStub())
        expect(topicResult).toEqual(topicStub())
      })
    })
  })

  describe('findAll', () => {
    describe('when called', () => {
      it('should display all topics', async () => {
        const topics = await service.topics({})

        expect(topics.items).toEqual([topicStub()])
      })
    })
  })

  describe('update', () => {
    describe('when topic with id exist', () => {
      it('should update the topic', async () => {
        const topicResult = await service.updateTopic(updateTopicStub())
        expect(topicResult).toEqual(topicStub())
      })
    })
  })
})
