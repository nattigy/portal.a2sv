import { Test, TestingModule } from '@nestjs/testing'
import { ManageGroupSeasonContestResolver } from './manage-group-season-contest.resolver'
import { ManageGroupSeasonContestService } from './manage-group-season-contest.service'

describe('ManageGroupSeasonContestResolver', () => {
  let resolver: ManageGroupSeasonContestResolver

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ManageGroupSeasonContestResolver, ManageGroupSeasonContestService],
    }).compile()

    resolver = module.get<ManageGroupSeasonContestResolver>(ManageGroupSeasonContestResolver)
  })

  it('should be defined', () => {
    expect(resolver).toBeDefined()
  })
})
