import { Test, TestingModule } from '@nestjs/testing'
import { UserGroupSeasonTopicService } from '../../services/user-group-season-services/user-group-season-topic.service'

describe('UserTopicService', () => {
  let service: UserGroupSeasonTopicService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [UserGroupSeasonTopicService],
    }).compile()

    service = module.get<UserGroupSeasonTopicService>(UserGroupSeasonTopicService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
