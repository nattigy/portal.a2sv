import { Test, TestingModule } from '@nestjs/testing'
import { UserTopicResolver } from './user-topic.resolver'
import { UserTopicService } from './user-topic.service'

describe('UserTopicResolver', () => {
  let resolver: UserTopicResolver

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserTopicResolver, UserTopicService],
    }).compile()

    resolver = module.get<UserTopicResolver>(UserTopicResolver)
  })

  it('should be defined', () => {
    expect(resolver).toBeDefined()
  })
})
