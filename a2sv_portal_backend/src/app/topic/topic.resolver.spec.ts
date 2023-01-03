import { Test, TestingModule } from '@nestjs/testing'
import { TopicResolver } from './topic.resolver'
import { TopicService } from './topic.service'
describe('TopicResolver', () => {
  let resolver: TopicResolver

  const mockTopicService = {
    createTopic: jest.fn(dto => {
      return {
        id: String,
        ...dto,
      }
    }),
    updateTopic:jest.fn(dto =>{
      return{
        
        ...dto
      }
    })
  }

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TopicResolver, TopicService],
    })
      .overrideProvider(TopicService)
      .useValue(mockTopicService)
      .compile()

    resolver = module.get<TopicResolver>(TopicResolver)
  })

  it('should be defined', () => {
    expect(resolver).toBeDefined()
  })

  it('Should create a topic', () => {
    const dto = { name: 'BFS', description: 'This is BFS' }
    expect(resolver.createTopic(dto)).toEqual({
      id: expect.any(String),
      name: dto.name,
      description: dto.description,
    })

    expect(mockTopicService.createTopic).toHaveBeenCalledWith(dto)
  })

  it('Should update a topic', () => {
    const dto = {topicId:"1", description: "BFS is graph traversal method"}
  expect(resolver.updateTopic(dto)).toEqual({
    id: dto.topicId,
    description:dto.description
  })

  expect(mockTopicService.updateTopic).toHaveBeenCalled();
  })

})
