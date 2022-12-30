import { Test, TestingModule } from '@nestjs/testing'
import { UserGroupSeasonTopicProblemResolver } from '../../services/user-group-season-services/user-group-season-topic-problem.resolver'
import { UserGroupSeasonTopicProblemService } from '../../services/user-group-season-services/user-group-season-topic-problem.service'

describe('SeasonTopicProblemUserResolver', () => {
  let resolver: UserGroupSeasonTopicProblemResolver

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserGroupSeasonTopicProblemResolver, UserGroupSeasonTopicProblemService],
    }).compile()

    resolver = module.get<UserGroupSeasonTopicProblemResolver>(
      UserGroupSeasonTopicProblemResolver,
    )
  })

  it('should be defined', () => {
    expect(resolver).toBeDefined()
  })
})
