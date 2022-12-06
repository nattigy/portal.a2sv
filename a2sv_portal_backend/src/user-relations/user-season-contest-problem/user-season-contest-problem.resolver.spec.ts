import { Test, TestingModule } from '@nestjs/testing'
import { UserSeasonContestProblemResolver } from './user-season-contest-problem.resolver'
import { UserSeasonContestProblemService } from './user-season-contest-problem.service'

describe('UserContestProblemResolver', () => {
  let resolver: UserSeasonContestProblemResolver

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserSeasonContestProblemResolver, UserSeasonContestProblemService],
    }).compile()

    resolver = module.get<UserSeasonContestProblemResolver>(UserSeasonContestProblemResolver)
  })

  it('should be defined', () => {
    expect(resolver).toBeDefined()
  })
})
