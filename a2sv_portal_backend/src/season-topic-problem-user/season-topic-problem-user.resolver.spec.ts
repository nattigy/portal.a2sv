import { Test, TestingModule } from '@nestjs/testing'
import { SeasonTopicProblemUserResolver } from './season-topic-problem-user.resolver'
import { SeasonTopicProblemUserService } from './season-topic-problem-user.service'

describe('SeasonTopicProblemUserResolver', () => {
  let resolver: SeasonTopicProblemUserResolver

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        SeasonTopicProblemUserResolver,
        SeasonTopicProblemUserService,
      ],
    }).compile()

    resolver = module.get<SeasonTopicProblemUserResolver>(
      SeasonTopicProblemUserResolver,
    )
  })

  it('should be defined', () => {
    expect(resolver).toBeDefined()
  })
})
