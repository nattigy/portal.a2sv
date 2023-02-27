import { Test, TestingModule } from '@nestjs/testing'
import { UserUpdateContestProblemService } from './user-update-contest-problem.service'

describe('UserUpdateContestProblemService', () => {
  let service: UserUpdateContestProblemService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserUpdateContestProblemService],
    }).compile()

    service = module.get<UserUpdateContestProblemService>(UserUpdateContestProblemService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
