import { Test, TestingModule } from '@nestjs/testing'
import { ContestLeaderboardService } from './contest-leaderboard.service'

describe('ContestLeaderboardService', () => {
  let service: ContestLeaderboardService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ContestLeaderboardService],
    }).compile()

    service = module.get<ContestLeaderboardService>(ContestLeaderboardService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
