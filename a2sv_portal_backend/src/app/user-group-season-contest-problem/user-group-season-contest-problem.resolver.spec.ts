import { Test, TestingModule } from '@nestjs/testing'
import { UserGroupSeasonContestProblemResolver } from '../../services/user-group-season-services/user-group-season-contest-problem.resolver'
import { UserGroupSeasonContestProblemService } from '../../services/manage-user-group-seasons/user-group-season-contest-problem.service'

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
