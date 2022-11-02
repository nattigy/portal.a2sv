import { Test, TestingModule } from '@nestjs/testing'
import { UserContestService } from './user-contest.service'

describe('UserContestService', () => {
  let service: UserContestService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserContestService],
    }).compile()

    service = module.get<UserContestService>(UserContestService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
