import { Test, TestingModule } from '@nestjs/testing'
import { ManageUserGroupSeasonTopicsService } from '../../services/manage-user-group-seasons/manage-user-group-season-topics.service'

describe('UserTopicService', () => {
  let service: ManageUserGroupSeasonTopicsService

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ManageUserGroupSeasonTopicsService],
    }).compile()

    service = module.get<ManageUserGroupSeasonTopicsService>(ManageUserGroupSeasonTopicsService)
  })

  it('should be defined', () => {
    expect(service).toBeDefined()
  })
})
