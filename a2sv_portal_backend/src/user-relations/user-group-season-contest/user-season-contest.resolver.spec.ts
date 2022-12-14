import { Test, TestingModule } from '@nestjs/testing'
import { UserGroupSeasonContestResolver } from './user-season-contest.resolver'
import { UserGroupSeasonContestService } from './user-season-contest.service'

describe('UserContestResolver', () => {
  let resolver: UserGroupSeasonContestResolver

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserGroupSeasonContestResolver, UserGroupSeasonContestService],
    }).compile()

    resolver = module.get<UserGroupSeasonContestResolver>(UserGroupSeasonContestResolver)
  })

  it('should be defined', () => {
    expect(resolver).toBeDefined()
  })
})
