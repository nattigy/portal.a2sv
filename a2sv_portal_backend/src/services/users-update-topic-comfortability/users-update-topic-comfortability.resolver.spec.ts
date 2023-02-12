import { Test, TestingModule } from '@nestjs/testing'
import { UsersUpdateTopicComfortabilityResolver } from './users-update-topic-comfortability.resolver'
import { UsersUpdateTopicComfortabilityService } from './users-update-topic-comfortability.service'

describe('UsersUpdateTopicComfortabilityResolver', () => {
  let resolver: UsersUpdateTopicComfortabilityResolver

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        UsersUpdateTopicComfortabilityResolver,
        UsersUpdateTopicComfortabilityService,
      ],
    }).compile()

    resolver = module.get<UsersUpdateTopicComfortabilityResolver>(
      UsersUpdateTopicComfortabilityResolver,
    )
  })

  it('should be defined', () => {
    expect(resolver).toBeDefined()
  })
})
