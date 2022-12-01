import { Test, TestingModule } from '@nestjs/testing'
import { UserSeasonContestService } from './user-season-contest.service'

describe('UserContestService', () => {
  let service: UserSeasonContestService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserSeasonContestService],
    }).compile()

    service = module.get<UserSeasonContestService>(UserSeasonContestService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
