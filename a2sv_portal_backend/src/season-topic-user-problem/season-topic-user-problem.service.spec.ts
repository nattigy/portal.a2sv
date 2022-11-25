import { Test, TestingModule } from '@nestjs/testing'
import { SeasonTopicUserProblemService } from './season-topic-user-problem.service'

describe('SeasonTopicProblemUserService', () => {
  let service: SeasonTopicUserProblemService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SeasonTopicUserProblemService],
    }).compile()

    service = module.get<SeasonTopicUserProblemService>(SeasonTopicUserProblemService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
