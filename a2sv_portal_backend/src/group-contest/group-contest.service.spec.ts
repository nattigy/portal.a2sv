import { Test, TestingModule } from '@nestjs/testing'
import { GroupContestService } from './group-contest.service'

describe('GroupContestService', () => {
  let service: GroupContestService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GroupContestService],
    }).compile()

    service = module.get<GroupContestService>(GroupContestService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
