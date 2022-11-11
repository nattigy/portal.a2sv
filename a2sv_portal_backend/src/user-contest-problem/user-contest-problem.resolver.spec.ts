import { Test, TestingModule } from '@nestjs/testing'
import { UserContestProblemResolver } from './user-contest-problem.resolver'
import { UserContestProblemService } from './user-contest-problem.service'

describe('UserContestProblemResolver', () => {
  let resolver: UserContestProblemResolver

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserContestProblemResolver, UserContestProblemService],
    }).compile()

    resolver = module.get<UserContestProblemResolver>(UserContestProblemResolver)
  })

  it('should be defined', () => {
    expect(resolver).toBeDefined()
  })
})
