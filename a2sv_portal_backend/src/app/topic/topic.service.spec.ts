import { Test, TestingModule } from '@nestjs/testing'
import { TopicService } from './topic.service'
import { TopicRepository } from './topic.repository'
describe('TopicService', () => {
  let service: TopicService
  const mockTopicRepository = {
    create: jest.fn().mockImplementation(dto => dto)
  };
  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TopicService, TopicRepository ]
       
        
    }).overrideProvider(TopicRepository)
    .useValue(mockTopicRepository)  
    .compile()

    service = module.get<TopicService>(TopicService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })

  it('should create a topic', ()=>{
    const dto = { name: 'BFS', description: 'This is BFS' }
    expect (service.create(dto)).toEqual({
      id: expect.any(String),
      name:dto.name,
      description:dto.description
    })

  })
})
