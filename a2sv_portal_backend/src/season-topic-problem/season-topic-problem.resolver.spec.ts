import { Test, TestingModule } from '@nestjs/testing'
import { SeasonTopicProblemResolver } from './season-topic-problem.resolver'
import { SeasonTopicProblemService } from './season-topic-problem.service'

describe('SeasonTopicProblemResolver', () => {
  let resolver: SeasonTopicProblemResolver

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SeasonTopicProblemResolver, SeasonTopicProblemService],
    }).compile()

    resolver = module.get<SeasonTopicProblemResolver>(SeasonTopicProblemResolver)
  })

  it('should be defined', () => {
    expect(resolver).toBeDefined()
  })
})
