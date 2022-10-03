import { Test, TestingModule } from '@nestjs/testing'
import { GroupTopicSeasonResolver } from './group-topic-season.resolver'
import { GroupTopicSeasonService } from './group-topic-season.service'

describe('GroupTopicSeasonResolver', () => {
  let resolver: GroupTopicSeasonResolver

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GroupTopicSeasonResolver, GroupTopicSeasonService],
    }).compile()

    resolver = module.get<GroupTopicSeasonResolver>(GroupTopicSeasonResolver)
  })

  it('should be defined', () => {
    expect(resolver).toBeDefined()
  })
})
