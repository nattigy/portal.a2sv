import { Test, TestingModule } from '@nestjs/testing'
import { UserGroupSeasonTopicResolver } from './user-season-topic.resolver'
import { UserGroupSeasonTopicService } from './user-season-topic.service'

describe('UserTopicResolver', () => {
  let resolver: UserGroupSeasonTopicResolver

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserGroupSeasonTopicResolver, UserGroupSeasonTopicService],
    }).compile()

    resolver = module.get<UserGroupSeasonTopicResolver>(UserGroupSeasonTopicResolver)
  })

  it('should be defined', () => {
    expect(resolver).toBeDefined()
  })
})
