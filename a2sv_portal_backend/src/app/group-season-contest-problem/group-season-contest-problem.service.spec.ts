import { Test, TestingModule } from '@nestjs/testing'
import { GroupSeasonContestProblemService } from '../../services/group-season-services/group-season-contest-problem.service'

describe('GroupSeasonContestProblemService', () => {
  let service: GroupSeasonContestProblemService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GroupSeasonContestProblemService],
    }).compile()

    service = module.get<GroupSeasonContestProblemService>(GroupSeasonContestProblemService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
