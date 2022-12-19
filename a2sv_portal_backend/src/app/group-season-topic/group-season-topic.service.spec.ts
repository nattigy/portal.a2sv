import { Test, TestingModule } from '@nestjs/testing'
import { GroupSeasonTopicService } from '../../services/group-services/group-season-topic.service'

describe('GroupSeasonTopicService', () => {
  let service: GroupSeasonTopicService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GroupSeasonTopicService],
    }).compile()

    service = module.get<GroupSeasonTopicService>(GroupSeasonTopicService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
