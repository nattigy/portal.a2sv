import { Test, TestingModule } from '@nestjs/testing'
import { GroupSeasonContestProblemResolver } from '../../services/group-season-services/group-season-contest-problem.resolver'
import { GroupSeasonContestProblemService } from '../../services/group-season-services/group-season-contest-problem.service'

describe('GroupSeasonContestProblemResolver', () => {
  let resolver: GroupSeasonContestProblemResolver

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GroupSeasonContestProblemResolver, GroupSeasonContestProblemService],
    }).compile()

    resolver = module.get<GroupSeasonContestProblemResolver>(GroupSeasonContestProblemResolver)
  })

  it('should be defined', () => {
    expect(resolver).toBeDefined()
  })
})
