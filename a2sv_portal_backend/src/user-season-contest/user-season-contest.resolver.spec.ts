import { Test, TestingModule } from '@nestjs/testing'
import { UserSeasonContestResolver } from './user-season-contest.resolver'
import { UserSeasonContestService } from './user-season-contest.service'

describe('UserContestResolver', () => {
  let resolver: UserSeasonContestResolver

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserSeasonContestResolver, UserSeasonContestService],
    }).compile()

    resolver = module.get<UserSeasonContestResolver>(UserSeasonContestResolver)
  })

  it('should be defined', () => {
    expect(resolver).toBeDefined()
  })
})
