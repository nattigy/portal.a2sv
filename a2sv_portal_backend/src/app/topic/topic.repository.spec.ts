import { Test, TestingModule } from '@nestjs/testing'
import { TopicRepository } from './topic.repository'

describe('TopicRepository', () => {
  let repository: TopicRepository

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [TopicRepository],
    }).compile()

   repository = module.get<TopicRepository>(TopicRepository)
  })

  it('should be defined', () => {
    expect(repository).toBeDefined()
  })
})
