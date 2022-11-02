import { Test, TestingModule } from '@nestjs/testing'
import { SeasonTopicProblemUserService } from './season-topic-problem-user.service'

describe('SeasonTopicProblemUserService', () => {
  let service: SeasonTopicProblemUserService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SeasonTopicProblemUserService],
    }).compile()

    service = module.get<SeasonTopicProblemUserService>(
      SeasonTopicProblemUserService,
    )
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
