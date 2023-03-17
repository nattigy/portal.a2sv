import { Test, TestingModule } from '@nestjs/testing'
import { ContestStatsResolver } from './contest-stats.resolver'
import { ContestStatsService } from './contest-stats.service'

describe('ContestStatsResolver', () => {
  let resolver: ContestStatsResolver

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ContestStatsResolver, ContestStatsService],
    }).compile()

    resolver = module.get<ContestStatsResolver>(ContestStatsResolver)
  })

  it('should be defined', () => {
    expect(resolver).toBeDefined()
  })
})
