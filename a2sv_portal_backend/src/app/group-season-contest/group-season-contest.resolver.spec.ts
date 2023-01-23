import { Test, TestingModule } from '@nestjs/testing'
import { GroupSeasonContestResolver } from '../../services/group-season-services/group-season-contest.resolver'
import { GroupSeasonContestService } from '../../services/group-season-services/group-season-contest.service'

describe('GroupSeasonContestResolver', () => {
  let resolver: GroupSeasonContestResolver

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GroupSeasonContestResolver, GroupSeasonContestService],
    }).compile()

    resolver = module.get<GroupSeasonContestResolver>(GroupSeasonContestResolver)
  })

  it('should be defined', () => {
    expect(resolver).toBeDefined()
  })
})
