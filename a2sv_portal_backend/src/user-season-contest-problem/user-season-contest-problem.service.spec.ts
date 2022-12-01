import { Test, TestingModule } from '@nestjs/testing'
import { UserSeasonContestProblemService } from './user-season-contest-problem.service'

describe('UserContestProblemService', () => {
  let service: UserSeasonContestProblemService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserSeasonContestProblemService],
    }).compile()

    service = module.get<UserSeasonContestProblemService>(UserSeasonContestProblemService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
