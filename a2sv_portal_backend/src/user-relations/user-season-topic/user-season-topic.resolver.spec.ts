import { Test, TestingModule } from '@nestjs/testing'
import { UserSeasonTopicResolver } from './user-season-topic.resolver'
import { UserSeasonTopicService } from './user-season-topic.service'

describe('UserTopicResolver', () => {
  let resolver: UserSeasonTopicResolver

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserSeasonTopicResolver, UserSeasonTopicService],
    }).compile()

    resolver = module.get<UserSeasonTopicResolver>(UserSeasonTopicResolver)
  })

  it('should be defined', () => {
    expect(resolver).toBeDefined()
  })
})
