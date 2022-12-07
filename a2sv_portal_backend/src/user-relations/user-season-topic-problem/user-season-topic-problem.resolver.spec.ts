import { Test, TestingModule } from '@nestjs/testing'
import { UserSeasonTopicProblemResolver } from './user-season-topic-problem.resolver'
import { UserSeasonTopicProblemService } from './user-season-topic-problem.service'

describe('SeasonTopicProblemUserResolver', () => {
  let resolver: UserSeasonTopicProblemResolver

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserSeasonTopicProblemResolver, UserSeasonTopicProblemService],
    }).compile()

    resolver = module.get<UserSeasonTopicProblemResolver>(UserSeasonTopicProblemResolver)
  })

  it('should be defined', () => {
    expect(resolver).toBeDefined()
  })
})
