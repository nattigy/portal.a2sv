import { Test, TestingModule } from '@nestjs/testing'
import { UserContestProblemService } from './user-contest-problem.service'

describe('UserContestProblemService', () => {
  let service: UserContestProblemService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserContestProblemService],
    }).compile()

    service = module.get<UserContestProblemService>(UserContestProblemService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
