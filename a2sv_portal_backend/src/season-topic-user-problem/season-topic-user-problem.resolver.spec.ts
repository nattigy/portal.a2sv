import { Test, TestingModule } from '@nestjs/testing'
import { SeasonTopicUserProblemResolver } from './season-topic-user-problem.resolver'
import { SeasonTopicUserProblemService } from './season-topic-user-problem.service'

describe('SeasonTopicProblemUserResolver', () => {
  let resolver: SeasonTopicUserProblemResolver

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SeasonTopicUserProblemResolver, SeasonTopicUserProblemService],
    }).compile()

    resolver = module.get<SeasonTopicUserProblemResolver>(SeasonTopicUserProblemResolver)
  })

  it('should be defined', () => {
    expect(resolver).toBeDefined()
  })
})
