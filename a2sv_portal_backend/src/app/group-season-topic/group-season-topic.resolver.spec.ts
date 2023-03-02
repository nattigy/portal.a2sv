import { Test, TestingModule } from '@nestjs/testing'
import { GroupSeasonTopicResolver } from '../../services/group-season-services/group-season-topic.resolver'
import { GroupSeasonTopicService } from '../../services/manage-group-seasons/manage-group-season-topics.service'

describe('GroupSeasonTopicResolver', () => {
  let resolver: GroupSeasonTopicResolver

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GroupSeasonTopicResolver, GroupSeasonTopicService],
    }).compile()

    resolver = module.get<GroupSeasonTopicResolver>(GroupSeasonTopicResolver)
  })

  it('should be defined', () => {
    expect(resolver).toBeDefined()
  })
})
