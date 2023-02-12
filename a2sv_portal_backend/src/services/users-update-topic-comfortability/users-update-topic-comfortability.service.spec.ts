import { Test, TestingModule } from '@nestjs/testing'
import { UsersUpdateTopicComfortabilityService } from './users-update-topic-comfortability.service'

describe('UsersUpdateTopicComfortabilityService', () => {
  let service: UsersUpdateTopicComfortabilityService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UsersUpdateTopicComfortabilityService],
    }).compile()

    service = module.get<UsersUpdateTopicComfortabilityService>(
      UsersUpdateTopicComfortabilityService,
    )
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
