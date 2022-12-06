import { Test, TestingModule } from '@nestjs/testing'
import { SeasonContestResolver } from './season-contest.resolver'
import { SeasonContestService } from './season-contest.service'

describe('SeasonContestResolver', () => {
  let resolver: SeasonContestResolver

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SeasonContestResolver, SeasonContestService],
    }).compile()

    resolver = module.get<SeasonContestResolver>(SeasonContestResolver)
  })

  it('should be defined', () => {
    expect(resolver).toBeDefined()
  })
})
