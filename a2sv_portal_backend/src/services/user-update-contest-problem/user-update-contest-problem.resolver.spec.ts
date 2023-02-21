import { Test, TestingModule } from '@nestjs/testing'
import { UserUpdateContestProblemResolver } from './user-update-contest-problem.resolver'
import { UserUpdateContestProblemService } from './user-update-contest-problem.service'

describe('UserUpdateContestProblemResolver', () => {
  let resolver: UserUpdateContestProblemResolver

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserUpdateContestProblemResolver, UserUpdateContestProblemService],
    }).compile()

    resolver = module.get<UserUpdateContestProblemResolver>(UserUpdateContestProblemResolver)
  })

  it('should be defined', () => {
    expect(resolver).toBeDefined()
  })
})
