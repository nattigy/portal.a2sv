import { Test, TestingModule } from '@nestjs/testing'
import { GroupContestResolver } from './group-contest.resolver'
import { GroupContestService } from './group-contest.service'

describe('GroupContestResolver', () => {
  let resolver: GroupContestResolver

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GroupContestResolver, GroupContestService],
    }).compile()

    resolver = module.get<GroupContestResolver>(GroupContestResolver)
  })

  it('should be defined', () => {
    expect(resolver).toBeDefined()
  })
})
