import { Test, TestingModule } from '@nestjs/testing'
import { GroupTopicSeasonService } from './group-topic-season.service'

describe('GroupTopicSeasonService', () => {
  let service: GroupTopicSeasonService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GroupTopicSeasonService],
    }).compile()

    service = module.get<GroupTopicSeasonService>(GroupTopicSeasonService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
