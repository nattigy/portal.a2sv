import { Test, TestingModule } from '@nestjs/testing'
import { ManageGroupSeasonContestService } from './manage-group-season-contest.service'

describe('ManageGroupSeasonContestService', () => {
  let service: ManageGroupSeasonContestService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ManageGroupSeasonContestService],
    }).compile()

    service = module.get<ManageGroupSeasonContestService>(ManageGroupSeasonContestService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
