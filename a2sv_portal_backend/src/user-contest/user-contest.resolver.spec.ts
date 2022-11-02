import { Test, TestingModule } from '@nestjs/testing'
import { UserContestResolver } from './user-contest.resolver'
import { UserContestService } from './user-contest.service'

describe('UserContestResolver', () => {
  let resolver: UserContestResolver

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserContestResolver, UserContestService],
    }).compile()

    resolver = module.get<UserContestResolver>(UserContestResolver)
  })

  it('should be defined', () => {
    expect(resolver).toBeDefined()
  })
})
