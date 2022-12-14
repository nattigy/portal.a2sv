import { Test, TestingModule } from '@nestjs/testing'
import { UserGroupSeasonContestProblemService } from './user-group-season-contest-problem.service'

describe('UserContestProblemService', () => {
  let service: UserGroupSeasonContestProblemService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserGroupSeasonContestProblemService],
    }).compile()

    service = module.get<UserGroupSeasonContestProblemService>(UserGroupSeasonContestProblemService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
