import { Test, TestingModule } from '@nestjs/testing'
import { ContestLeaderboardResolver } from './contest-leaderboard.resolver'
import { ContestLeaderboardService } from './contest-leaderboard.service'

describe('ContestLeaderboardResolver', () => {
  let resolver: ContestLeaderboardResolver

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ContestLeaderboardResolver, ContestLeaderboardService],
    }).compile()

    resolver = module.get<ContestLeaderboardResolver>(ContestLeaderboardResolver)
  })

  it('should be defined', () => {
    expect(resolver).toBeDefined()
  })
})
