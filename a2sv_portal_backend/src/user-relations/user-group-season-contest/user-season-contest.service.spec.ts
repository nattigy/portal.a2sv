import { Test, TestingModule } from '@nestjs/testing'
import { UserGroupSeasonContestService } from './user-season-contest.service'

describe('UserContestService', () => {
  let service: UserGroupSeasonContestService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserGroupSeasonContestService],
    }).compile()

    service = module.get<UserGroupSeasonContestService>(UserGroupSeasonContestService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
