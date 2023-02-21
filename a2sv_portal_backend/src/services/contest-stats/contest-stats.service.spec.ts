import { Test, TestingModule } from '@nestjs/testing'
import { ContestStatsService } from './contest-stats.service'

describe('ContestStatsService', () => {
  let service: ContestStatsService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ContestStatsService],
    }).compile()

    service = module.get<ContestStatsService>(ContestStatsService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
