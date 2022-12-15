import { Test, TestingModule } from '@nestjs/testing'
import { UserGroupSeasonContestProblemResolver } from './user-group-season-contest-problem.resolver'
import { UserGroupSeasonContestProblemService } from './user-group-season-contest-problem.service'

describe('UserContestProblemResolver', () => {
  let resolver: UserGroupSeasonContestProblemResolver

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserGroupSeasonContestProblemResolver, UserGroupSeasonContestProblemService],
    }).compile()

    resolver = module.get<UserGroupSeasonContestProblemResolver>(
      UserGroupSeasonContestProblemResolver,
    )
  })

  it('should be defined', () => {
    expect(resolver).toBeDefined()
  })
})
