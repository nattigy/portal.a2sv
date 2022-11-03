import { Test, TestingModule } from '@nestjs/testing'
import { SeasonTopicProblemService } from './season-topic-problem.service'

describe('SeasonTopicProblemService', () => {
  let service: SeasonTopicProblemService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SeasonTopicProblemService],
    }).compile()

    service = module.get<SeasonTopicProblemService>(SeasonTopicProblemService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
